require('module-alias/register')  
const functions = require('firebase-functions');
const testController = require('@app');
const profileController = require('@profile');
const ldrBoardController = require('@leaderboard');
const bountyController = require('@bounty');
const randomController = require('@random');
const toolController = require('@tool');
const dashBoardController = require('@dashboard')

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions

exports.test = functions.https.onRequest(testController);
exports.profile = functions.https.onRequest(profileController);
exports.ldrboard = functions.https.onRequest(ldrBoardController);
exports.bounty = functions.https.onRequest(bountyController);
exports.random = functions.https.onRequest(randomController);
exports.tool = functions.https.onRequest(toolController);
exports.dashboard = functions.https.onRequest(dashBoardController);

// ยาาางช้ายม่ายยยยด้ายยยรอก่อน UPGRADE น้าาานายยยยย
exports.scheduledFunction = functions.pubsub.schedule("* * * * *").timeZone('Asia/Bangkok').onRun((context) => {
    console.log("This will be run every minute!");
});