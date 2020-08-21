const functions = require('firebase-functions');
const testController = require('./api/controller/testController');
const authController = require('./api/controller/auth');
const profileController = require('./api/controller/profileController');
const ldrBoardController = require('./api/controller/leaderboard');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions

exports.test = functions.https.onRequest(testController);
exports.auth = functions.https.onRequest(authController);
exports.profile = functions.https.onRequest(profileController);
exports.ldrboard = functions.https.onRequest(ldrBoardController);