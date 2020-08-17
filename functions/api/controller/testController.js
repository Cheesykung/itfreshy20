const cors = require('cors');
const express = require('express');
const admin = require('../config/admin');
const passport = require("passport");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const AES = require("crypto-js/aes");
const CryptoJS = require("crypto-js");
const db = admin.firestore();
const User = require("./models/User");
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
                        const snapshot = await USERSRef.where('uid', '==', profile.id).get();
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

passport.serializeUser(function (user, done) {
    done(null, user.id);
});

// used to deserialize the user
passport.deserializeUser(async function (id, done) {
    const snapshot = await USERSRef.where('id', '==', id).get();
    snapshot.forEach(doc => {
        console.log(doc.id, '=>', doc.data());
        done(null, doc.data())
    });
});

testController.get("/account", isLoggedIn, function (req, res) {
    console.log("account")
    console.log(req.user);
    // res.render('profile', {
    //     user: req.user // get the user out of session and pass to template
    // });
});

testController.get("/control", isLoggedIn, function (req, res) {
    console.log(req.user.role);
});

testController.get("/genqrcode", isLoggedIn, async function (req, res) {
    console.log("genqr" + req.user.uid);
    const snapshot = await LINKRef.where('uid', '==', req.user.uid).get();
    if (snapshot.empty) {
        var name = uuidv4()
        var textfirst = CryptoJS.AES.encrypt(name, "secret key 123");
        var ciphertext = encodeURI(textfirst);
        const data = {
            link: ciphertext,
            uid: req.user.uid,
            point: 10
        };
        console.log(ciphertext);
        const test = await db.collection('links').add(data);
        console.log(test.id)
        res.send("http://localhost:5001/itfreshy2020/us-central1/test/qrcode/" + ciphertext);
        return;
    }
    snapshot.forEach(async doc => {
        if (doc.data().point <= 10) {
            const testdel = await db.collection('links').doc(doc.id).delete();
            var name = uuidv4()
            var textfirst = CryptoJS.AES.encrypt(name, "secret key 123");
            var ciphertext = encodeURI(textfirst);
            const data = {
                link: ciphertext,
                uid: req.user.uid,
                point: 10
            };
            console.log(ciphertext);
            const test = await db.collection('links').add(data);
            console.log(test.id)
            console.log(testdel.id)
            res.send("http://localhost:5001/itfreshy2020/us-central1/test/qrcode/" + ciphertext);
            return;
        }
        else {
            res.send("http://localhost:5001/itfreshy2020/us-central1/test/qrcode/" + doc.data().link);
        }
    });
});
testController.get("/qrcode/:id", function (req, res) {
    var dec = decodeURI(req.params.id);
    var bytes = CryptoJS.AES.decrypt(dec.toString(), "secret key 123");
    var plaintext = bytes.toString(CryptoJS.enc.Utf8);
    console.log(typeof plaintext);
    if (plaintext == "") {
        res.send("ไม่ผ่าน");
    } else {
        User.findOne({ uid: plaintext }, function (err, obj) {
            if (err) {
                res.send("ไม่ผ่าน");
            }
            if (obj.uid != null) {
                res.send("point + 1");
            }
        });
    }
});
// route middleware to make sure
function isLoggedIn(req, res, next) {
    // if user is authenticated in the session, carry on
    if (req.isAuthenticated()) return next();

    // if they aren't redirect them to the home page
    res.redirect("/");
}
testController.get(
    "/auth/facebook",
    passport.authenticate("facebook", { scope: "email" })
);

testController.route("/facebook/callback").get(
    passport.authenticate("facebook", {
        successRedirect: "/profile",
        failureRedirect: "/",
    })
);

testController.get("/api/user", isLoggedIn, (req, res) => {
    if (isLoggedIn) res.json(req.user);
});

testController.get("/", (req, res) => {
    res.render("index");
});
testController.get("/a", async (req, res) => {
    res.send("start")
});
testController.get("/logout", function (req, res) {
    req.logout();
    res.redirect("/");
});

module.exports = testController;