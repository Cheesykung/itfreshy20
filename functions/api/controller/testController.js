//require zone
const compression = require("compression");
const path = require("path");
const cors = require("cors");
const express = require("express");
const admin = require("../config/admin");
const passport = require("passport");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const db = admin.firestore();
const facebookStrategy = require("passport-facebook").Strategy;
const firestore = admin.firestore();
const { v4: uuidv4 } = require("uuid");
const { S_IFBLK } = require("constants");
const testController = express();
const SECRef = db.collection("secertfromuser");
const BOUNTYRef = db.collection("bountys");
const SBOUNTYRef = db.collection("bountyscan");
const SCANSRef = db.collection("scans");
const USERSRef = db.collection("users");
const LINKRef = db.collection("links");
const ALLRef = db.collection("allstats");
const helmet = require("helmet");
const Cookies = require("js-cookie");
const allowCrossDomain = function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "*");
  res.header("Access-Control-Allow-Headers", "*");
  next();
};

var bunyan = require("bunyan");
//const { doc } = require("prettier");
const { link } = require("fs");
var log = bunyan.createLogger({ name: "myapp" });
log.info("Server start");
// server setup
testController.use(
  session({
    secret: "ilovescotchscotfchyscotchscotch",
    resave: false,
    saveUninitialized: true,
  })
);
testController.use(allowCrossDomain);
testController.use(helmet());
testController.use(passport.initialize());
testController.use(passport.session());
testController.use(cookieParser());
testController.use(compression());
testController.use(cors({ origin: true }));
testController.set("views", path.join(__dirname, "views"));
testController.set("view engine", "ejs");
//authen use
passport.use(
  new facebookStrategy(
    {
      // pull in our app id and secret from our auth.js file
      clientID: "306264320456438",
      clientSecret: "f076de5e27c1ea459950049ccad236a1",
      callbackURL: "http://localhost:8080/facebook/callback",
      profileFields: ["id", "displayName", "name", "gender", "photos", "email"],
    }, // facebook will send back the token and profile
    function (token, refreshToken, profile, done) {
      process.nextTick(async function () {
        // asynchronous
        try {
          const usersnapshot = await USERSRef.doc(profile.id).get();
          if (!usersnapshot.exists) {
            //user สมัครครั้งแรก
            log.info("new User");
            const res = await USERSRef.doc(profile.id).set({
              id: uuidv4(),
              name: profile.name.givenName + " " + profile.name.familyName,
              token: token,
              pic:
                "https://graph.facebook.com/" +
                profile.id +
                "/picture" +
                "?type=large" +
                "&access_token=" +
                token,
              point: 0,
              uid: profile.id,
              role: "User",
              newuser: 1,
              count: 0,
            });
            const newusers = ALLRef.doc("stat")
              .get()
              .then((newusers) => {
                const newuse = ALLRef.doc("stat").set(
                  { alluser: newusers.data().alluser + 1 },
                  { merge: true }
                );
              });
          }
          const usersnapshots = await USERSRef.doc(profile.id)
            .get()
            .then((doc) => {
              const vis = ALLRef.doc("stat")
                .get()
                .then((vis) => {
                  const visit = ALLRef.doc("stat").set(
                    { allvisitor: vis.data().allvisitor + 1 },
                    { merge: true }
                  );
                });
              log.info("user found");
              log.info(doc.data().name + " is logged in");
              return done(null, doc.data());
            });
        } catch (err) {
          if (err) return done(err);
        }
      });
    }
  )
);
passport.serializeUser(function (user, done) {
  done(null, user.id);
}); //เก็บ id ไว้ใน session
// used to deserialize the user //นำ id ที่เก็บไว้ใน session เรียกกลับมาใช้
passport.deserializeUser(async function (id, done) {
  const userdeserialize = await USERSRef.where("id", "==", id).get();
  userdeserialize.forEach((doc) => {
    done(null, doc.data());
  });
});

//generate qrcode รอเทส
testController.get("/genqrcode", isLoggedIn, async function (req, res) {
  try {
    log.info("genQR: " + req.user.uid);
    const genqrsnapshot = await LINKRef.where("uid", "==", req.user.uid).get();
    const name = uuidv4();
    const data = { link: name, uid: req.user.uid, time: 10, year: parseInt(req.user.year) };
    if (genqrsnapshot.empty) {
      log.info("create qr " + req.user.uid);
      const newDoc = await db
        .collection("links")
        .doc(req.user.uid)
        .set(data)
        .then(() => {
          res.status(200).send({
            statusCode: "201",
            statusText: "Created",
            error: false,
            message: "Successfully generated qr code",
            qrcode:
              "http://localhost:5001/itfreshy2020/us-central1/test/qrcode/" +
              name,
          });
        })
        .catch((err) => {
          res.status(400).send({
            statusCode: "400",
            statusText: "Bad Request",
            error: true,
            message: "QR code generate fail.",
          });
        });
    } else {
      genqrsnapshot.forEach((doc) => {
        if (doc.data().time <= 0) {
          log.info("Delete qr " + req.user.uid);
          const qrDel = db
            .collection("links")
            .doc(doc.id)
            .delete()
            .then(() => {
              log.info(name + req.user.uid);
              const newDoc = db
                .collection("links")
                .doc(req.user.uid)
                .set(data)
                .then(() => {
                  res.status(200).send({
                    statusCode: "201",
                    statusText: "Created",
                    error: false,
                    message: "Successfully generated new qr code",
                    qrcode:
                      "http://localhost:5001/itfreshy2020/us-central1/test/qrcode/" +
                      name,
                  });
                })
                .catch((err) => {
                  res.status(400).send({
                    statusCode: "400",
                    statusText: "Bad Request",
                    error: true,
                    message: "QR code generate fail.",
                  });
                });
            });
        } else {
          log.info("normal qR" + req.user.uid);
          res.status(200).send({
            statusCode: "200",
            statusText: "Request Success",
            error: false,
            message: "Successfully request qr",
            qrcode:
              "http://localhost:5001/itfreshy2020/us-central1/test/qrcode/" +
              doc.data().link,
          });
        }
      });
    }
  } catch (err) {
    res.status(500).send({
      statusCode: "500",
      statusText: "Internal Server Error",
      error: true,
      message: "Internal Server Error",
    });
  }
});
//เสร็จ
testController.get("/qrcode/:id", isLoggedIn, async function (req, res) {
  const findlink = LINKRef.where('link', '==', req.params.id)
    .get().then((findlink) => {
      if (findlink.empty) {
        res.send("link not found")
        return;
      }
      findlink.forEach(linkdata => {
        if (linkdata.data().time <= 0) {
          res.send("time out link")
          return
        }
        else {
          const scanuserdata = db.collection('scans').doc(req.user.uid)
            .get()
            .then((scanuserdata) => {
              if (scanuserdata.data().scan.indexOf(linkdata.data().uid) != "-1") {
                res.send("havedscan")
              }
              else {
                const bountyplus = db.collection('bounty').doc('list')
                  .get()
                  .then((bountyplus) => {
                    if (bountyplus.data().list.indexOf(linkdata.data().uid) != "-1") {
                      const userupdatepoint = USERSRef.doc(req.user.uid)
                        .get()
                        .then((userupdatepoint) => {
                          const update = USERSRef.doc(req.user.uid).set(
                            { point: userupdatepoint.data().point + 6,count: userupdatepoint.data().count + 1 },
                            { merge: true }
                          );
                          res.send({ name: userupdatepoint.data().name, year: userupdatepoint.data().year, pic: userupdatepoint.data().pic, point: 6 })
                          return;
                        })
                    }
                    else {
                      const userupdatepoint = USERSRef.doc(req.user.uid)
                        .get()
                        .then((userupdatepoint) => {
                          const update = USERSRef.doc(req.user.uid).set(
                            { point: userupdatepoint.data().point + 3 ,count: userupdatepoint.data().count + 1},
                            { merge: true }
                          );
                          res.send({ name: userupdatepoint.data().name, year: userupdatepoint.data().year, pic: userupdatepoint.data().pic, point: 3 })

                          return;
                        })
                    }

                  })
                  .then(() => {
                    const timedecrease = LINKRef.doc(linkdata.data().uid).set(
                      { time: linkdata.data().time - 1 },
                      { merge: true }
                    );
                    const scansave = SCANSRef.doc(req.user.uid).update({
                      scan: admin.firestore.FieldValue.arrayUnion(
                        linkdata.data().uid
                      )
                    });
                  })
              }
              return;
            })
        }
        // res.send(linkdata.data());
      });

    })



});

testController.get(
  "/auth/facebook",
  passport.authenticate("facebook", {
    scope: "email",
    session: true
  })
);

testController.route("/facebook/callback").get(
  passport.authenticate("facebook", {
    successRedirect: "/profile",
    failureRedirect: "/",
  })
);

testController.get("/api/user", isLoggedIn, (req, res) => {
  try {
    log.info("---------->api/user");
    if (isLoggedIn) {
      res.status(200).json(req.user);
    } else {
      res.status(400).send({
        statusCode: "400",
        statusText: "Bad Request",
        error: true,
        message: "Not logged in.",
      });
    }
  } catch (err) {
    res.status(500).send({
      statusCode: "500",
      statusText: "Internal Server Error",
      error: true,
      message: "Internal Server Error",
    });
  }
});

// testController.get("/", (req, res) => {
//   try {
//     log.info("----------->Index");
//     res.status(200).render("index");
//   } catch (err) {
//     res.status(500).send({
//       statusCode: "500",
//       statusText: "Internal Server Error",
//       error: true,
//       message: "Internal Server Error",
//     });
//   }
// });
//admin query tools
testController.get(
  "/ryutools/finddoc/:collection/:docname",
  isAdmin,
  async (req, res) => {
    log.info(
      "king querty doc " +
      req.params.collection +
      " doc name " +
      req.params.docname
    );
    const all = await db
      .collection(req.params.collection)
      .doc(req.params.docname)
      .get();
    // const all = await db.collection('bountys').doc('bounty').get();
    if (!all.exists) {
      res.send("cannot find");
      return "หาไม่เจอ";
    } else {
      res.send(all.data());
    }
  }
);
testController.get("/ryutools/find/:id", isAdmin, async (req, res) => {
  async function getMarkers(id) {
    const markers = [];
    await db.collection(id).get()
      .then(querySnapshot => {
        querySnapshot.docs.forEach(doc => {
          markers.push({ id: doc.id, data: doc.data() });
        });
      });
    return res.send(markers);
  }
  getMarkers(req.params.id)

});


testController.get("/help", async (req, res) => {
  res.render("help")
});

testController.get("/logout", (req, res) => {
  try {
    log.info("----------> Logout");
    req.logout();
    res.redirect("/");
  } catch (err) {
    res.status(500).send({
      statusCode: "500",
      statusText: "Internal Server Error",
      error: true,
      message: "Internal Server Error",
    });
  }
});

testController.get("/checka", (req, res) => {
  res.send({ data: req.user })
  console.log(req.user)
});

testController.use(function (req, res, next) {
  res.status(404);
  res.render("404");
  // res.render("gimmick")
});

// route middleware to make sure
function isLoggedIn(req, res, next) {
  try {
    // if user is authenticated in the session, carry on
    if (req.isAuthenticated()) {
      log.info("---------->isOn");
      return next();
    } else {
      // if they aren't redirect them to the home page
      log.info("----------->isOut");
      res.redirect("/");
    }
  } catch (err) {
    res.status(500).send({
      statusCode: "500",
      statusText: "Internal Server Error",
      error: true,
      message: "Internal Server Error",
    });
  }
}

function isAdmin(req, res, next) {
  try {
    if (req.isAuthenticated()) {
      if (req.user.role == "king") {
        log.info("king " + req.user.name + " use");
        return next();
      } else {
        log.info(req.user.name + " request admin tool");
        res.render("404");
        return;
      }
    } else {
      res.render("404");
      return;
    }
  } catch (err) {
    res.status(500).send({
      statusCode: "500",
      statusText: "Internal Server Error",
      error: true,
      message: "Internal Server Error",
    });
  }
}
module.exports = testController;
