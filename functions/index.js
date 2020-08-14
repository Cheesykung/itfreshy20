const functions = require('firebase-functions');
const testController = require('./api/controller/testController');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions

exports.test = functions.https.onRequest(testController);

