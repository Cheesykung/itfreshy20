const cors = require('cors');
const express = require('express');
const admin = require('../config/admin');
const passport = require("passport");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const AES = require("crypto-js/aes");
const CryptoJS = require("crypto-js");
const db = admin.firestore();
//const User = require("./models/User");
const facebookStrategy = require("passport-facebook").Strategy;
const firestore = admin.firestore();
const { v4: uuidv4 } = require('uuid');
const testController = express();
const USERSRef = db.collection('users');
const LINKRef = db.collection('links');

testController.use(session({
    secret: "ilovescotchscotfchyscotchscotch", resave: false,
    saveUninitialized: false
}));
testController.use(passport.initialize());
testController.use(passport.session());
testController.use(cookieParser());
testController.use(cors({ origin: true }));

/*
testController.get('/shiba', async (req, res) => {
    try {
        res.status(200).send({
            'statusCode': '200',
            'statusText': 'Success',
            'error': false
        });
    } catch (e) {
        console.log(e);
        res.status(500).send({
            'statusCode': '500',
            'statusText': 'Internal Server Error',
            'error': true
        });
        return;
    }
});

testController.post('/cybireans', async (req, res) => {
    try {
        let {name,lname} = req.body;
        console.log(name, lname);

        let year1 = {
            "namekey" : name,
            "surnamekey" : lname,
            "years" : 1
        };

        let userRef = firestore.collection("USERs").doc(name);
        await userRef.set(year1);
        res.send(200);

    } catch (e) {
        console.log(e);
        res.status(500).send({
            'statusCode': '500',
            'statusText': 'Internal Server Error',
            'error': true
        });
        return ;
    }
});

testController.get('/iam/:name', async (req, res) => {
    try {
        let name = req.params.name;
        let userRef = firestore.collection("USERs").doc(name);
        let userDoc = await userRef.get();
        if (userDoc.exists) {
            let user = userDoc.data();
            res.status(200).send({
                'statusCode' : '200',
                'statusText' : 'COMPLETE, OK',
                'error' : false,
                'data' : user
            });
        }
        else {
            res.status(404).send({
                'statusCode' : '404',
                'statusText' : 'NOT FOUND',
                'error' : true
            })
        };
        return ;
    } catch (e) {
        console.log(e);
        res.status(500).send({
            'statusCode': '500',
            'statusText': 'Internal Server Error',
            'error': true
        });
        return ;
    }
})
*/

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
            // asynchronous
            process.nextTick(async function () {
                try {
                    const snapshot = await USERSRef.where('uid', '==', profile.id).get();
                    if (snapshot.empty) {
                        console.log("new")
                        const res = await db.collection('users').add({
                            id: uuidv4(),
                            name: profile.name.givenName + " " + profile.name.familyName,
                            token: token,
                            // email: profile.emails[0].value,
                            // gender: profile.gender,
                            pic: "https://graph.facebook.com/" +
                                profile.id +
                                "/picture" +
                                "?type=large" +
                                "&access_token=" +
                                token,
                            point: 0,
                            uid: profile.id
                        })
                        //const snapshot = await USERSRef.where('uid', '==', profile.id).get(); ซ้ำกับ 119
                        snapshot.forEach(doc => {
                            console.log("old")
                            console.log(doc.data())
                            return done(null, doc.data());
                        });
                    }
                    else {
                        snapshot.forEach(doc => {
                            console.log("user found");
                            console.log(doc.data())
                            return done(null, doc.data());
                        });
                    }
                }
                catch (err) {
                    if (err) return done(err);
                }
            });
        }
    )
);
//เก็บ id ไว้ใน session
passport.serializeUser(function (user, done) {
    done(null, user.id);
});

// used to deserialize the user //นำ id ที่เก็บไว้ใน session เรียกกลับมาใช้
passport.deserializeUser(async function (id, done) {
    const snapshot = await USERSRef.where('id', '==', id).get();
    snapshot.forEach(doc => {
        //console.log(doc.id, '=>', doc.data());
        done(null, doc.data())
    });
});

testController.get("/account", isLoggedIn, function (req, res) {
    try {
        console.log("----------->account");
        console.log(req.user);
        // res.render('profile', {
        //     user: req.user // get the user out of session and pass to template
        // });
    } catch (err) {
        res.status(500).send({
            statusCode: '500',
            statusText: 'Internal Server Error',
            error: true,
            message: 'Internal Server Error'
        });
    }
});

testController.get("/control", isLoggedIn, function (req, res) {
    try {
        console.log(req.user.role);
    } catch (err) {
        res.status(500).send({
            statusCode: '500',
            statusText: 'Internal Server Error',
            error: true,
            message: 'Internal Server Error'
        });
    }
});

testController.get("/genqrcode", isLoggedIn, async function (req, res) {
    try{
        const UID = req.user.uid;
        console.log("genQR: " + req.user.uid);
        const snapshot = await LINKRef.where('uid', '==', UID).get();
        if (snapshot.empty) {
            const name = uuidv4();
            const textFirst = CryptoJS.AES.encrypt(name, "secret key 123");
            const ciphertext = encodeURI(textFirst);
            const data = {
                link: ciphertext,
                uid: UID,
                point: 10
            };
            console.log(ciphertext);
            const newDoc = await db.collection('links').add(data)
                .then(() => {
                    res.status(200).send({
                        'statusCode': '201',
                        'statusText': 'Created',
                        'error': false,
                        'message': 'Successfully generated qr code',
                        'qrcode': 'http://localhost:5001/itfreshy2020/us-central1/test/qrcode/' + ciphertext
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
        snapshot.forEach(doc => {
            if (doc.data().point <= 0) {
                console.log('Delete qr')
                const qrDel = db.collection('links').doc(doc.id).delete()
                    .then(() => {
                        let name = uuidv4()
                        let textFirst = CryptoJS.AES.encrypt(name, "secret key 123");
                        let ciphertext = encodeURI(textFirst);
                        const data = {
                            link: ciphertext,
                            uid: UID,
                            point: 10
                        };
                        console.log(ciphertext);
                        const newDoc = db.collection('links').add(data).then(() => {
                            res.status(200).send({
                                'statusCode': '201',
                                'statusText': 'Created',
                                'error': false,
                                'message': 'Successfully generated new qr code',
                                'qrcode': 'http://localhost:5001/itfreshy2020/us-central1/test/qrcode/' + ciphertext
                            });
                            //res.send("http://localhost:5001/itfreshy2020/us-central1/test/qrcode/" + ciphertext);
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
                console.log('point > 0');
                res.status(200).send({
                    'statusCode': '200',
                    'statusText': 'Request Success',
                    'error': false,
                    'message': 'Successfully request qr',
                    'qrcode': 'http://localhost:5001/itfreshy2020/us-central1/test/qrcode/' + doc.data().link
                });
                //res.send("http://localhost:5001/itfreshy2020/us-central1/test/qrcode/" + doc.data().link);
            }
        });
    } catch (err) {
        res.status(500).send({
            statusCode: '500',
            statusText: 'Internal Server Error',
            error: true,
            message: 'Internal Server Error'
        });
    }
});

testController.get("/qrcode/:id", async function (req, res) {
    try {
        let dec = decodeURI(req.params.id);
        let bytes = CryptoJS.AES.decrypt(dec.toString(), "secret key 123");
        let plaintext = bytes.toString(CryptoJS.enc.Utf8);
        console.log(typeof (plaintext));
        if (plaintext === "") {
            console.log('not pass1')
            res.status(400).send({
                'statusCode': '400',
                'statusText': 'Bad Request',
                'error': true,
                'message': 'Not pass.'
            });
            //res.send("ไม่ผ่าน");
        } else {
            User.findOne({ uid: plaintext }, function (err, obj) {
                if (err) {
                    //res.send("ไม่ผ่าน");
                    console.log('not pass2')
                    res.status(400).send({
                        'statusCode': '400',
                        'statusText': 'Bad Request',
                        'error': true,
                        'message': 'Not pass.'
                    });
                }
                else if (obj.uid != null) {
                    console.log('point + 1');
                    //res.send("point + 1");
                    res.status(200).send({
                        'statusCode': '200',
                        'statusText': 'Request Success',
                        'error': false,
                        'message': 'point + 1'
                    });
                }
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

testController.get("/a", (req, res) => {
    try {
        console.log('----------->Start');
        //res.send("start")
        res.status(200).send({
            'statusCode': '200',
            'statusText': 'Request Success',
            'error': false,
            'message': 'Start'
        });
    } catch (err) {
        res.status(500).send({
            statusCode: '500',
            statusText: 'Internal Server Error',
            error: true,
            message: 'Internal Server Error'
        });
    }
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

module.exports = testController;