//require zone // sailor

const minify = require("express-minify");
const compression = require("compression");
const path = require("path");
const cors = require("cors");
const express = require("express");
const admin = require("../config/admin");
const cookieParser = require("cookie-parser");
const db = admin.firestore();
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
const bodyParser = require('body-parser')
const { auth } = require('firebase-admin');
const authService = auth();
const bunyan = require("bunyan");
const { link } = require("fs");
// const { get } = require("core-js/fn/dict");
const log = bunyan.createLogger({ name: "myapp" });
if (process.env.NODE_ENV === 'production') {
  testController.set('trust proxy', 1); // trust first proxy
}
testController.use(minify());
testController.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "https://itfreshy2020.web.app");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,Content-Type,Authorization"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});
testController.use(bodyParser.json());
testController.use(bodyParser.urlencoded({ extended: true }));
testController.use(helmet());
testController.use(cookieParser());
testController.use(compression());
testController.use(cors({ origin: true, credentials: true }));
testController.set("views", path.join(__dirname, "views"));
testController.set("view engine", "ejs");
log.info("Server start");

testController.get("/fire", isLoggedIn, async (req, res) => {
  try {
    const checknewuser = USERSRef.doc(req.user.uid)
      .get().then((checknewuser) => {
        if (checknewuser.exists) {
          if (checknewuser.data().newuser == 1) {
            const allvisitorget = ALLRef.doc('stat').get().then((allvisitorget) => {
              const allvisitorupdate = ALLRef.doc('stat').set({
                allvisitor: allvisitorget.data().allvisitor + 1
              }, { merge: true })
            })
            res.status(200).json({ data: "newuser" })
            return;
          }
          else {
            const allvisitorget = ALLRef.doc('stat').get().then((allvisitorget) => {
              const allvisitorupdate = ALLRef.doc('stat').set({
                allvisitor: allvisitorget.data().allvisitor + 1
              }, { merge: true })
            })
            const getuser = USERSRef.doc(req.user.uid).get().then((getuser) => {
              res.status(200).json({ data: "pass", year: getuser.data().year, status: getuser.data().status, count: getuser.data().count, gate: getuser.data().gate })
            })
            return;
          }
        } else {
          const allvisitorget = ALLRef.doc('stat').get().then((allvisitorget) => {
            const allvisitorupdate = ALLRef.doc('stat').set({
              allvisitor: allvisitorget.data().allvisitor + 1
            }, { merge: true })
          })
          res.status(200).json({ data: "newuser" })
          const alluserget = ALLRef.doc('stat').get().then((alluserget) => {
            const alluserupdate = ALLRef.doc('stat').set({
              alluser: alluserget.data().alluser + 1
            }, { merge: true })
          })
          const newuser = USERSRef.doc(req.user.uid).set({
            name: req.user.name,
            uid: req.user.uid,
            pic: req.user.picture,
            newuser: 1,
            count: 0,
            role: "user",
          })
          return;
        }
      })
  } catch (error) {
    res.status(500).json({ data: error })
  };
})
testController.get("/gate", isLoggedIn, async (req, res) => {
  try {
    const getgate = SECRef.doc(req.body.id).get().then((getgate) => {
      res.status(200).json({ data: getgate.data().gate })
      const assigngate = USERSRef.doc(req.user.uid).set({
        gate: getgate.data().gate
      }, { merge: true })
    })

  }
  catch (err) {
    res.status(500).json({ data: err })
  }
})

testController.get("/genqrcode", isLoggedIn, async function (req, res) {
  let data = {}
  try {
    const getyear = USERSRef.doc(req.user.uid).get().then((getyear) => {
      let data = { link: name, uid: req.user.uid, time: 10, year: getyear.data().year};
    })
    log.info("genQR: " + req.user.uid);
    const genqrsnapshot = await LINKRef.where("uid", "==", req.user.uid).get();
    const name = uuidv4();
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
              "https://itfreshy2020.web.app/qrcode/" +
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
                      "https://itfreshy2020.web.app/qrcode/" +
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
              "https://itfreshy2020.web.app/qrcode/" +
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
//ค้าง qrcode เหลือโยนคำถาม
testController.get("/qrcode/:id", isLoggedIn, async function (req, res) {
  const findlink = LINKRef.where("link", "==", req.params.id)
    .get()
    .then((findlink) => {
      if (findlink.empty) {
        res.send("link not found");
        return;
      }
      findlink.forEach((linkdata) => {
        checker = linkdata.data().uid;
        checkyear = link.data().year;
        if (linkdata.data().time <= 0) {
          res.send("time out link");
          return;
        } else {
          const scanuserdata = db
            .collection("scans")
            .doc(req.user.uid)
            .get()
            .then((scanuserdata) => {
              if (
                scanuserdata.data().scan.indexOf(linkdata.data().uid) != "-1"
              ) {
                res.send("havedscan");
              } else {
                //year 1 scan2 or 2 scan 1 return
                const bountyplus = db
                  .collection("bounty")
                  .doc("list")
                  .get()
                  .then((bountyplus) => {
                    if (
                      bountyplus.data().list.indexOf(linkdata.data().uid) !=
                      "-1"
                    ) {
                      const sender = USERSRef.doc(checker)
                        .get()
                        .then((sender) => {
                          res.send({
                            name: sender.data().name,
                            year: sender.data().year,
                            pic: sender.data().pic,
                            point: 6,
                          });
                        });
                      const userupdatepoint = USERSRef.doc(req.user.uid)
                        .get()
                        .then((userupdatepoint) => {
                          const update = USERSRef.doc(req.user.uid).set(
                            {
                              point: userupdatepoint.data().point + 6,
                              count: userupdatepoint.data().count + 1,
                            },
                            { merge: true }
                          );
                          return;
                        });
                    } else {
                      //year 1 scan2 or 2 scan 1 return

                      const sender = USERSRef.doc(checker)
                        .get()
                        .then((sender) => {
                          res.send({
                            name: sender.data().name,
                            year: sender.data().year,
                            pic: sender.data().pic,
                            point: 6,
                          });
                        });
                      const userupdatepoint = USERSRef.doc(req.user.uid)
                        .get()
                        .then((userupdatepoint) => {
                          const update = USERSRef.doc(req.user.uid).set(
                            {
                              point: userupdatepoint.data().point + 3,
                              count: userupdatepoint.data().count + 1,
                            },
                            { merge: true }
                          );
                          return;
                        });
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
                      ),
                    });
                  });
              }
              return;
            });
        }
        // res.send(linkdata.data());
      });
    });
});

testController.get("/", (req, res) => {
  try {
    log.info("----------->Index");
    res.status(200).render("index");
  } catch (err) {
    res.status(500).send({
      statusCode: "500",
      statusText: "Internal Server Error",
      error: true,
      message: "Internal Server Error",
    });
  }
});
// //admin query tools
// testController.get(
//   "/ryutools/finddoc/:collection/:docname",
//   isAdmin,
//   async (req, res) => {
//     log.info(
//       "king querty doc " +
//         req.params.collection +
//         " doc name " +
//         req.params.docname
//     );
//     const all = await db
//       .collection(req.params.collection)
//       .doc(req.params.docname)
//       .get();
//     // const all = await db.collection('bountys').doc('bounty').get();
//     if (!all.exists) {
//       res.send("cannot find");
//       return "หาไม่เจอ";
//     } else {
//       res.send(all.data());
//     }
//   }
// );
// testController.get("/ryutools/find/:id", isAdmin, async (req, res) => {
//   async function getMarkers(id) {
//     const markers = [];
//     await db
//       .collection(id)
//       .get()
//       .then((querySnapshot) => {
//         querySnapshot.docs.forEach((doc) => {
//           markers.push({ id: doc.id, data: doc.data() });
//         });
//       });
//     return res.send(markers);
//   }
//   getMarkers(req.params.id);
// });

// testController.get("/help", async (req, res) => {
//   res.render("help");
// });

// testController.get("/logout", (req, res) => {
//   try {
//     log.info("----------> Logout");

//     req.logout();
//     res.status(200).send({
//       statusCode: "200",
//       statusText: "Request Success",
//       error: false,
//       message: "logout succesful  ",
//     });
//   } catch (err) {
//     res.status(500).send({
//       statusCode: "500",
//       statusText: "Internal Server Error",
//       error: true,
//       message: "Internal Server Error",
//     });
//   }
// });

// testController.get("/checka", (req, res) => {
//   // res.json({ data: req.user, session: req.session });
//   res.json(req.user)
//   console.log(req.user);
// });
// testController.get("/checkss", (req, res) => {
//   // res.json({ data: req.user, session: req.session });
//   res.json(req.session)
//   console.log(req.user);
// });


testController.use(function (req, res, next) {
  res.status(404);
  res.render("404");
  // res.render("gimmick")
});

// // route middleware to make sure
async function isLoggedIn(req, res, next) {
  const idToken = req.header('FIREBASE_AUTH_TOKEN');
  let decodedIdToken;
  try {
    decodedIdToken = await authService.verifyIdToken(idToken);
  } catch (error) {
    next(error);
    return;
  }
  req.user = decodedIdToken;
  next();
}
//ค้าง
function isAdmin(req, res, next) {
  try {
    if (req.isAuthenticated()) {
      if (req.user.role == "king") {
        log.info("king " + req.user.name + " use");
        return next();
      } else {
        log.info(req.user.name + " request admin tool");
        res.status(404).render({
          statusCode: "404",
          statusText: "Not Found",
          error: true,
          message: "user is not king"
        });
        return;
      }
    } else {
      res.status(404).render({
        statusCode: "404",
        statusText: "Not Found",
        error: true,
        message: "user not found"
      });
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
