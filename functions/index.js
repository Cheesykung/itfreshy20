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

// Cron-job Schedule-Work
// Set auto run random bounty everyday at 12:00
exports.scheduledFunction = functions.pubsub.schedule("* * * * *").timeZone('Asia/Bangkok').onRun(async (context) => {
    let userRef = await firestore.collection('users').get();
    let users = [];

    // forEach to .data() in each item in array users
    userRef.forEach(function (data) {
        let user = data.data();
        users.push(data.uid);
    });

    let bounty_id = [];
    for (let i = 0; i < 10; i++) {
        //random number between 0 - 9 for array[index]
        let x = Math.floor(Math.random() * users.length); //math.random will return number between 0 -> 1
        bounty_id.push(users[x]);
    }

    // update ref of bounty to 'bounty' in db
    await firestore.collection('bounty').doc('list').set({
        'list' : bounty_id
    });
});