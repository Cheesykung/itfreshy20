require('module-alias/register')  
const functions = require('firebase-functions');
const testController = require('@app');
const authController = require('@auth');
// const profileController = require('@proflie');
// const ldrBoardController = require('@leaderboard');
const bountyController = require('@bounty');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions

exports.test = functions.https.onRequest(testController);
exports.auth = functions.https.onRequest(authController);
// exports.profile = functions.https.onRequest(profileController);
// exports.ldrboard = functions.https.onRequest(ldrBoardController);
exports.bounty = functions.https.onRequest(bountyController);

// ยาาางช้ายม่ายยยยด้ายยยรอก่อน UPGRADE น้าาานายยยยย
exports.scheduledFunction = functions.pubsub.schedule("* * * * *").timeZone('Asia/Bangkok').onRun((context) => {
    console.log("This will be run every minute!");
});