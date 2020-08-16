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
const axios = require("axios");
const facebookStrategy = require("passport-facebook").Strategy;
const firestore = admin.firestore();

const testController = express();

testController.use(session({ secret: "ilovescotchscotfchyscotchscotch" }));
testController.use(passport.initialize());
testController.use(passport.session());
testController.use(cookieParser());
testController.use(cors({ origin: true }));

testController.get('/test', async (req, res) => {
    try {
        res.status(200).send({
            'statusCode': '200',
            'statusText': 'Success',
            'error': false
        });
    } catch (e) {
        res.status(500).send({
            'statusCode': '500',
            'statusText': 'Internal Server Error',
            'error': true
        });
        return ;
    }
});


passport.use(
    new facebookStrategy(
      {
        // pull in our app id and secret from our auth.js file
        clientID: "306264320456438",
        clientSecret: "f076de5e27c1ea459950049ccad236a1",
        callbackURL: "http://localhost:8080/facebook/callback",
        profileFields: ["id", "displayName", "name", "gender", "photos", "email"],
      }, // facebook will send back the token and profile
      function(token, refreshToken, profile, done) {
        // asynchronous
        process.nextTick(function() {
          // find the user in the database based on their facebook id
          User.findOne({ uid: profile.id }, function(err, user) {
            // if there is an error, stop everything and return that
            // ie an error connecting to the database
            if (err) return done(err);
  
            // if the user is found, then log them in
            if (user) {
              console.log("user found");
              console.log(user);
              return done(null, user); // user found, return that user
            } else {
              // if there is no user found with that facebook id, create them
              var newUser = new User();
  
              // set all of the facebook information in our user model
              newUser.uid = profile.id; // set the users facebook id
              newUser.token = token; // we will save the token that facebook provides to the user
              newUser.name =
                profile.name.givenName + " " + profile.name.familyName; // look at the passport user profile to see how names are returned
              try {
                newUser.email = profile.emails[0].value;
              } catch (err) {
                console.log("not haVE ");
              }
              newUser.gender = profile.gender;
              newUser.pic =
                "https://graph.facebook.com/" +
                profile.id +
                "/picture" +
                "?type=large" +
                "&access_token=" +
                token;
              newUser.point = 0;
              // save our user to the database
              newUser.save(function(err) {
                if (err) throw err;
  
                // if successful, return the new user
                return done(null, newUser);
              });
            }
          });
        });
      }
    )
  );
  
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });
  
  // used to deserialize the user
  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });
  
  testController.get("/account", isLoggedIn, function(req, res) {
    console.log(req.user);
    // res.render('profile', {
    //     user: req.user // get the user out of session and pass to template
    // });
  });
  
  testController.get("/control", isLoggedIn, function(req, res) {
    console.log(req.user.role);
  });
  
  testController.get("/genqrcode", isLoggedIn, function(req, res) {
    console.log("genqr" + req.user.name);
    var textfirst = CryptoJS.AES.encrypt(req.user.uid, "secret key 123");
    var ciphertext = encodeURI(textfirst);
    console.log(ciphertext);
    res.render("qrcode", {
      user: req.user,
      text: "localhost:5000/qrcode/" + ciphertext, // get the user out of session and pass to template
    });
  });
  testController.get("/qrcode/:id", function(req, res) {
    var dec = decodeURI(req.params.id);
    var bytes = CryptoJS.AES.decrypt(dec.toString(), "secret key 123");
    var plaintext = bytes.toString(CryptoJS.enc.Utf8);
    console.log(typeof plaintext);
    if (plaintext == "") {
      res.send("ไม่ผ่าน");
    } else {
      User.findOne({ uid: plaintext }, function(err, obj) {
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
  testController.get("/a", (req, res) => {
    // console.log(plaintext);
    res.send("fortest");
  });
  testController.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/");
  });
  
module.exports = testController;