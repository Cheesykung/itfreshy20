//require zone
const path = require('path');
const cors = require('cors');
const express = require('express');
const admin = require('../config/admin');
const passport = require("passport");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const db = admin.firestore();
const facebookStrategy = require("passport-facebook").Strategy;
const firestore = admin.firestore();
const { v4: uuidv4 } = require('uuid');
const { S_IFBLK } = require('constants');
const testController = express();
const SECRef = db.collection('secertfromuser');
const BOUNTYRef = db.collection('bountys');
const SBOUNTYRef = db.collection('bountyscan');
const SCANSRef = db.collection('scans');
const USERSRef = db.collection('users');
const LINKRef = db.collection('links');
// server setup
testController.use(session({
    secret: "ilovescotchscotfchyscotchscotch", resave: false,
    saveUninitialized: false
}));
testController.use(passport.initialize());
testController.use(passport.session());
testController.use(cookieParser());
testController.use(cors({ origin: true }));
testController.set('views', path.join(__dirname, 'views'));
testController.set('view engine', 'ejs');
//authen use
passport.use(
    new facebookStrategy(
        {// pull in our app id and secret from our auth.js file
            clientID: "306264320456438",
            clientSecret: "f076de5e27c1ea459950049ccad236a1",
            callbackURL: "http://localhost:8080/facebook/callback",
            profileFields: ["id", "displayName", "name", "gender", "photos", "email"],
        }, // facebook will send back the token and profile
        function (token, refreshToken, profile, done) {
            process.nextTick(async function () {// asynchronous
                try {
                    const usersnapshot = await USERSRef.doc(profile.id).get();
                    if (!usersnapshot.exists) {//user สมัครครั้งแรก
                        console.log("new User")
                        const res = await USERSRef.doc(profile.id).set({
                            id: uuidv4(),
                            name: profile.name.givenName + " " + profile.name.familyName,
                            token: token,
                            pic: "https://graph.facebook.com/" +
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
                        })
                    }
                    const usersnapshots = await USERSRef.doc(profile.id).get().then((doc) => {
                        console.log("user found");
                        console.log(doc.data())
                        return done(null, doc.data());
                    })
                }
                catch (err) {
                    if (err) return done(err);
                }
            });
        }
    )
);
passport.serializeUser(function (user, done) { done(null, user.id) }); //เก็บ id ไว้ใน session
// used to deserialize the user //นำ id ที่เก็บไว้ใน session เรียกกลับมาใช้
passport.deserializeUser(async function (id, done) {
    const userdeserialize = await USERSRef.where('id', '==', id).get();
    userdeserialize.forEach(doc => { done(null, doc.data()) });
});

//generate qrcode รอเทส
testController.get("/genqrcode", isLoggedIn, async function (req, res) {
    try {
        console.log("genQR: " + req.user.uid);
        const genqrsnapshot = await LINKRef.where('uid', '==', req.user.uid).get();
        const name = uuidv4();
        const data = { link: name, uid: req.user.uid, time: 10 };
        if (genqrsnapshot.empty) {
            console.log("create qr " + req.user.uid)
            const newDoc = await db.collection('links').doc(req.user.uid).set(data)
                .then(() => {
                    res.status(200).send({
                        'statusCode': '201',
                        'statusText': 'Created',
                        'error': false,
                        'message': 'Successfully generated qr code',
                        'qrcode': 'http://localhost:5001/itfreshy2020/us-central1/test/qrcode/' + name
                    });
                }).catch((err) => {
                    res.status(400).send({
                        'statusCode': '400',
                        'statusText': 'Bad Request',
                        'error': true,
                        'message': 'QR code generate fail.'
                    })
                })
        }
        else {
            genqrsnapshot.forEach(doc => {
                if (doc.data().time <= 0) {
                    console.log('Delete qr ' + req.user.uid)
                    const qrDel = db.collection('links').doc(doc.id).delete()
                        .then(() => {
                            console.log(name + req.user.uid);
                            const newDoc = db.collection('links').add(data).then(() => {
                                res.status(200).send({
                                    'statusCode': '201',
                                    'statusText': 'Created',
                                    'error': false,
                                    'message': 'Successfully generated new qr code',
                                    'qrcode': 'http://localhost:5001/itfreshy2020/us-central1/test/qrcode/' + name
                                });
                            }).catch((err) => {
                                res.status(400).send({
                                    'statusCode': '400',
                                    'statusText': 'Bad Request',
                                    'error': true,
                                    'message': 'QR code generate fail.'
                                });
                            });
                        });
                }
                else {
                    console.log('normal qR' + req.user.uid);
                    res.status(200).send({
                        'statusCode': '200',
                        'statusText': 'Request Success',
                        'error': false,
                        'message': 'Successfully request qr',
                        'qrcode': 'http://localhost:5001/itfreshy2020/us-central1/test/qrcode/' + doc.data().link
                    });
                }
            })
        };
    } catch (err) {
        res.status(500).send({
            statusCode: '500',
            statusText: 'Internal Server Error',
            error: true,
            message: 'Internal Server Error'
        });
    }
});
//เสร็จ
testController.get("/qrcode/:id", isLoggedIn, async function (req, res) {
    const snapshot = await LINKRef.where('link', '==', req.params.id).get();
    const userupdate = await USERSRef.where('uid', '==', req.user.uid).get();
    const scan = await SCANSRef.where('uid', '==', req.user.uid).get();
    const bounty = await BOUNTYRef.doc('bounty').get();
    const bountylink = await SBOUNTYRef.where('uid', '==', req.user.uid).get();
    if (snapshot.empty) {
        res.send("cannot find link")
        console.log(req.user.name + " cannotfindlink")
        return ;
    }
    else {
        snapshot.forEach(doc => {
            const idlink = doc.id
            const uidlink = doc.data().uid
            const timelink = doc.data().time
            if (doc.data().time <= 0) {
                res.send("code เสียแล้ว")
                console.log(req.user.name + " scan fail code ของ " + doc.data().name)
                return ;
            }
            else {
                scan.forEach(doc => {
                    for (var i = 0; i < doc.data().scan.length; i++) {
                        if (doc.data().scan[i] == uidlink) {
                            res.send("เคยscan แล้ว")
                            return;
                        }
                    }
                    const timeupdate = db.collection('links').doc(idlink).update({ time: timelink - 1 });
                    userupdate.forEach(doc => {
                        const useruptaeres = USERSRef.doc(doc.id).update({ point: doc.data().point + 1 });
                    });
                    const scanres = SCANSRef.doc(doc.id).update({
                        scan: admin.firestore.FieldValue.arrayUnion(uidlink)
                    })
                    res.send(uidlink)
                });
            }
        })
    }
});

testController.get(
    "/auth/facebook",
    passport.authenticate("facebook", {
        scope: "email"
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
        console.log('---------->api/user');
        if (isLoggedIn) {
            res.status(200).json(req.user);
        } else {
            res.status(400).send({
                'statusCode': '400',
                'statusText': 'Bad Request',
                'error': true,
                'message': 'Not logged in.'
            });
        }
    } catch (err) {
        res.status(500).send({
            statusCode: '500',
            statusText: 'Internal Server Error',
            error: true,
            message: 'Internal Server Error'
        });
    }
});

testController.get("/", (req, res) => {
    try {
        console.log('----------->Index')
        res.status(200).render("index");
    } catch (err) {
        res.status(500).send({
            statusCode: '500',
            statusText: 'Internal Server Error',
            error: true,
            message: 'Internal Server Error'
        });
    }
});
//admin query tools
testController.get("/ryutools/:collection/:docname", isAdmin, async (req, res) => {
    console.log("king querty doc " +  req.params.collection + " doc name " + req.params.docname)
    const all = await db.collection(req.params.collection).doc(req.params.docname).get();
    // const all = await db.collection('bountys').doc('bounty').get();
    if (!all.exists) {
        res.send("cannot find")
        return "หาไม่เจอ"
    }
    else {
        res.send(all.data())
    }
    // try {
    //     console.log('----------->Start');
    //     //res.send("start")
    //     res.status(200).send({
    //         'statusCode': '200',
    //         'statusText': 'Request Success',
    //         'error': false,
    //         'message': 'Start'
    //     });
    // } catch (err) {
    //     res.status(500).send({
    //         statusCode: '500',
    //         statusText: 'Internal Server Error',
    //         error: true,
    //         message: 'Internal Server Error'
    //     });
    // }
});

testController.get("/roletest", async (req, res) => {
    res.send(req.user)

});

testController.get("/logout", (req, res) => {
    try {
        console.log('----------> Logout')
        req.logout();
        res.redirect("/");
    } catch (err) {
        res.status(500).send({
            statusCode: '500',
            statusText: 'Internal Server Error',
            error: true,
            message: 'Internal Server Error'
        });
    }
});
testController.use(function (req, res, next) {
    res.status(404);
    res.render("gimmick")
})

// route middleware to make sure
function isLoggedIn(req, res, next) {
    try {
        // if user is authenticated in the session, carry on
        if (req.isAuthenticated()) {
            console.log('---------->isOn');
            return next();
        }
        else {    // if they aren't redirect them to the home page
            console.log('----------->isOut');
            res.redirect("/");
        }
    } catch (err) {
        res.status(500).send({
            statusCode: '500',
            statusText: 'Internal Server Error',
            error: true,
            message: 'Internal Server Error'
        });
    }
}

function isAdmin(req, res, next) {
    try {
        // if user is authenticated in the session, carry on
        if (req.isAuthenticated()) {
            if (req.user.role == 'king') {
                console.log('king use')
                return next();
            }
            else{
                console.log("user request admin tool")
                res.send("you shall not pass");
                return;
            }
        }
        else {// if they aren't redirect them to the home page
            console.log('----------->isOut');
            res.send("you shall not pass");
            return;
        }
    } catch (err) {
        res.status(500).send({
            statusCode: '500',
            statusText: 'Internal Server Error',
            error: true,
            message: 'Internal Server Error'
        });
    }
}

module.exports = testController;