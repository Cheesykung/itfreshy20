//require zone // sailor


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
const SECRef = db.collection("secretfromuser");
const BOUNTYRef = db.collection("bountys");
const SBOUNTYRef = db.collection("bountyscan");
const SCANSRef = db.collection("scans");
const USERSRef = db.collection("users");
const LINKRef = db.collection("links");
const ALLRef = db.collection("allstats");
const helmet = require("helmet");
const bodyParser = require("body-parser");
const { auth } = require("firebase-admin");
const authService = auth();
const bunyan = require("bunyan");
const { link } = require("fs");
const log = bunyan.createLogger({ name: "myapp" });
if (process.env.NODE_ENV === "production") {
  testController.set("trust proxy", 1); // trust first proxy
}

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

testController.post('/backup', isLoggedIn, async (req, res) => {
  const testRandom = await firestore.collection('users').get();
  const backup = await firestore.collection('backupUser');
  const userRef2 = await firestore.collection("users").doc(req.user.uid).get();
  let role = userRef2.data().role;

  console.log(role) // ใช้ newuserเป็น 0
  if (role == "king") {
    testRandom.forEach(doc => {
      backup.doc(doc.id).set(doc.data());
    });
    res.send("okkk")
  } else {
    res.send("not admin")
  }


});
testController.get('/getfire/:id', isLoggedIn, async (req, res) => {
  const getotheruser = USERSRef.doc(req.params.id)
    .get()
    .then((getotheruser) => {
      if (getotheruser.exists) {
        res.status(200).json({
          pic: getotheruser.data().pic,
          name: getotheruser.data().name,
          count: getotheruser.data().count,
          gate: getotheruser.data().gate,
          uid: getotheruser.data().uid,
          scanSave: getotheruser.data().scanSave,
          branch: getotheruser.data().branch,
          contact: getotheruser.data().contact,
          point: getotheruser.data().point,
          coin: getotheruser.data().coin,
        });
      }
      else{
        res.status(500).json({data: "notfound"})
      }
    })
});


testController.get("/fire", isLoggedIn, async (req, res) => {
  // try {
  const checknewuser = USERSRef.doc(req.user.uid)
    .get()
    .then((checknewuser) => {
      if (checknewuser.exists) {
        if (checknewuser.data().newuser == 1) {
          const allvisitorget = ALLRef.doc("stat")
            .get()
            .then((allvisitorget) => {
              const allvisitorupdate = ALLRef.doc("stat").set(
                {
                  allvisitor: allvisitorget.data().allvisitor + 1,
                },
                { merge: true }
              );
            });
          res.status(200).json({ data: "newuser" });
          return;
        } else {
          const allvisitorget = ALLRef.doc("stat")
            .get()
            .then((allvisitorget) => {
              const allvisitorupdate = ALLRef.doc("stat").set(
                {
                  allvisitor: allvisitorget.data().allvisitor + 1,
                },
                { merge: true }
              );
            });
          const getuser = USERSRef.doc(req.user.uid)
            .get()
            .then((getuser) => {
              res.status(200).json({ data: "pass", user: getuser.data() });
            });
          return;
        }
      } else {
        const allvisitorget = ALLRef.doc("stat")
          .get()
          .then((allvisitorget) => {
            const allvisitorupdate = ALLRef.doc("stat").set(
              {
                allvisitor: allvisitorget.data().allvisitor + 1,
              },
              { merge: true }
            );
          });
        res.status(200).json({ data: "newuser" });
        const alluserget = ALLRef.doc("stat")
          .get()
          .then((alluserget) => {
            const alluserupdate = ALLRef.doc("stat").set(
              {
                alluser: alluserget.data().alluser + 1,
              },
              { merge: true }
            );
          });
        const newuser = USERSRef.doc(req.user.uid).set({
          name: req.user.name,
          uid: req.user.uid,
          pic: req.user.picture,
          newuser: 1,
          count: 0,
          role: "user",
        });
        return;
      }
    });
  // } catch (error) {
  //   res.status(500).json({ data: error });
  // }
});
testController.post("/gate", isLoggedIn, async (req, res) => {
  try {
    const getgate = SECRef.doc(req.body.stdid)
      .get()
      .then((getgate) => {
        res
          .status(200)
          .json({ key: req.body.stdid, data: getgate.data().gate });
        const assigngate = USERSRef.doc(req.user.uid).set(
          {
            gate: getgate.data().gate,
          },
          { merge: true }
        );
      });
  } catch (err) {
    res.status(500).json({ data: err });
  }
});
//marks ขาด middle ware
testController.get("/genqrcode", isLoggedIn, async function (req, res) {
  // res.status(200).send("kuyyyy")
  let data = {};
  const name = uuidv4();
  try {
    const statsRef = await firestore.collection("allstats").doc("stat");
    const getyear = USERSRef.doc(req.user.uid)
      .get()
      .then((getyear) => {
        return (data = {
          link: name,
          uid: req.user.uid,
          time: 10,
          year: getyear.data().year,
          player: getyear.data().player,
          stdid: getyear.data().id,
        });
      })
      .then(async (getyear) => {
        log.info("genQR: " + req.user.uid);
        const genqrsnapshot = await LINKRef.where(
          "uid",
          "==",
          req.user.uid
        ).get();
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
                qrcode: "https://itfreshy2020.web.app/qrcode/" + name,
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
                        qrcode: "https://itfreshy2020.web.app/qrcode/" + name,
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
                  "https://itfreshy2020.web.app/qrcode/" + doc.data().link,
              });
            }
          });
        }
        let isAllGenerate = await statsRef.get().then((data) => {
          return data.data().allgenerate;
        });
        await statsRef.update({
          allgenerate: isAllGenerate + 1,
        });
      });
  } catch (err) {
    res.status(500).send({
      statusCode: "500",
      statusText: "Internal Server Error",
      error: true,
      message: "Internal Server Error",
    });
  }
});

testController.post("/scan/:id", isLoggedIn, async (req, res) => {
  try {
    const scanID = req.params.id;
    const userUID = req.user.uid;
    const userRef = firestore.collection("users");
    const linkRef = firestore.collection("links");
    const scanRef = await firestore.collection("scans");
    let findLink = await linkRef.where("link", "==", scanID).get();
    if (!findLink.empty) {
      await findLink.forEach((doc) => {
        let linkUID = doc.data().uid;
        let linkYear = parseInt(doc.data().year);
        let linkTime = parseInt(doc.data().time);
        let linkPlayer = parseInt(doc.data().player);
        let stdid = doc.data().stdid;

        if (linkUID !== userUID) {
          if (linkTime <= 0) {
            res.status(200).send({
              statusCode: 200,
              statusText: "Bad Request",
              error: true,
              message: "Link timed out",
              time: false,
            });
          } else {
            scanRef
              .doc(userUID)
              .get()
              .then(async (scanUserData) => {
                if (scanUserData.data().scan.indexOf(linkUID) != -1) {
                  res.status(200).send({
                    statusCode: 200,
                    statusText: "Bad Request",
                    error: true,
                    message: "Have scanned",
                    time: true,
                  });
                } else {
                  const userData = await userRef.doc(userUID).get();
                  const linkData = await userRef.doc(linkUID).get();
                  const statsRef = await firestore
                    .collection("allstats")
                    .doc("stat");
                  let isYear = parseInt(userData.data().year);
                  let isPlayer = parseInt(userData.data().player);
                  // let isLinkPlayer = parseInt(linkData.data().player);
                  let isLinkPlayer = linkPlayer;
                  // let isLinkYear = parseInt(linkData.data().year);
                  let isLinkYear = linkYear
                  let bounty = await firestore
                    .collection("bounty")
                    .doc("list")
                    .get();

                  //const dataLink = await userRef.doc(linkUID).get();
                  let arrayPoint = [5, 7, 9, 11];
                  let point;
                  if (bounty.data().list.indexOf(linkUID) != -1) {
                    point = linkYear <= 4 ? arrayPoint[linkYear - 1] : 11;
                    let isAllBounty = await statsRef.get().then((data) => {
                      return data.data().allbounty;
                    });
                    await statsRef.update({
                      allbounty: isAllBounty + 1,
                    });
                  } else {
                    point = 3;
                  }

                  if (
                    isPlayer === 1 &&
                    isLinkPlayer === 1 &&
                    isYear !== isLinkYear &&
                    (isYear === 1 || isLinkYear === 1)
                  ) {
                    //ถ้าคนสแกนกับคนโดนเป็น player //อันนึงต้องปี1
                    //quistion fals ถ้าไม่มีคำถาม linkstdid
                    res.status(200).send({
                      name: linkData.data().name,
                      year: isLinkYear,
                      pic: linkData.data().pic,
                      question: linkData.data().like ? true : false, //ไม่มีคำถาม
                      time: true,
                      like: linkData.data().like,
                      stdid: linkData.data().id, //ถามว่าจะมีกรณีที่ความชอบเติมไม่ครบมั้ย
                      uid: linkUID,
                      point: point
                    });
                  } else {
                    //else ถ้าไม่มีใน bounty =>
                    //1 ให้ res name, year, pic, point ของ linnkUIDuse
                    const dataLink = await userRef.doc(linkUID).get();
                    res.status(200).send({
                      name: dataLink.data().name,
                      year: dataLink.data().year,
                      pic: dataLink.data().pic,
                      time: true,
                      stdid: linkData.data().id,
                      point: point,
                      uid: linkUID,
                    });
                  }
                  //2 ให้เรา update point + 3 และ count + 1 ให้ตัวเอง
                  let isLinkName = linkData.data().name;
                  let isLinkBranch = linkData.data().branch;
                  let isLinkContact = linkData.data().contact;
                  let isLinkPic = linkData.data().pic;
                  let userDataLink = await userData.data().scanSave;
                  let arrayDataLink = userDataLink ? userDataLink : [];
                  arrayDataLink.push({
                    uid: linkUID,
                    year: linkYear,
                    name: isLinkName ? isLinkName : null,
                    branch: isLinkBranch ? isLinkBranch : null,
                    contact: isLinkContact ? isLinkContact : null,
                    pic: isLinkPic ? isLinkPic : null,
                  });
                  //console.log(arrayDataLink);
                  await userRef
                    .doc(userUID)
                    .get()
                    .then((userUpdate) => {
                      userRef.doc(userUID).update({
                        point: userUpdate.data().point + point,
                        count: userUpdate.data().count + 1,
                        scanSave: arrayDataLink,
                      });
                    });

                  //อัพเดทใน scan ของตัวเอง เพิ่ม uid ที่เราไปสแกน
                  let updateScan = scanUserData.data().scan;
                  updateScan.push(linkUID);
                  await scanRef.doc(userUID).update({
                    scan: updateScan,
                  });

                  //then time - 1 >= 0 ของ linkUID
                  await linkRef.doc(linkUID).update({
                    time: linkTime - 1,
                  });

                  let isAllScan = await statsRef.get().then((data) => {
                    return data.data().allscan;
                  });

                  await statsRef.update({
                    allscan: isAllScan + 1,
                  });
                }
              });
          }
        } else {
          res.status(200).send({
            statusCode: "400",
            statusText: "Bad Request",
            error: true,
            message: "link is invalid",
          });
        }
      });
    } else {
      res.status(200).send({
        statusCode: "200",
        statusText: "Bad Request",
        error: true,
        message: "Link is empty",
      });
    }
  } catch (e) {
    res.status(500).send({
      statusCode: "500",
      statusText: "Internal Server Error",
      error: true,
    });
  }
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
//admin query tools
testController.get("/ryutools/finddoc/:collection/:docname", (req, res) => {
  try {
    log.info(
      "king querty doc " +
      req.params.collection +
      " doc name " +
      req.params.docname
    );
    const all = db
      .collection(req.params.collection)
      .doc(req.params.docname)
      .get()
      .then((all) => {
        if (!all.exists) {
          res.send("cannot find");
          return "หาไม่เจอ";
        } else {
          res.send(all.data());
        }
      });
  } catch (err) {
    res.send("error");
  }
});
testController.get("/ryutools/find/:id", async (req, res) => {
  const snapshot = await firebase
    .firestore()
    .collection(req.params.id)
    .get();
  const documents = [];
  snapshot.forEach((doc) => {
    documents[doc.id] = doc.data();
  });
  res.json(documents);
});

testController.get("/help", async (req, res) => {
  res.render("help");
});

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
  const idToken = req.header("FIREBASE_AUTH_TOKEN");
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
          message: "user is not king",
        });
        return;
      }
    } else {
      res.status(404).render({
        statusCode: "404",
        statusText: "Not Found",
        error: true,
        message: "user not found",
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
