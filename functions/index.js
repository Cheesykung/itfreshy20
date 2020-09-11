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

exports.scheduledFunction = functions.pubsub.schedule('* * * * *').timeZone('Asia/Bangkok').onRun((context) => {
    console.log('This will be run every minutes!');
    return null;
  });
// exports.scheduledFunction = functions.pubsub.schedule("0 12 * * *").timeZone('Asia/Bangkok').onRun(async (context) => {
//     let userRef = await firestore.collection('users').get();

//         // array of each years
//         let year1_users = [];
//         let year2_users = [];
//         let year3_users = [];
//         let year4_users = [];

//         // forEach to .data() in each item in array users
//         userRef.forEach(function (element) {
//             let user = element.data();
//             if (user.newuser == 0) {
//                 // separate all users  we got into each year array for the random
//                 user.year == "1" ? year1_users.push(user) : null;
//                 user.year == "2" ? year2_users.push(user) : null;
//                 user.year == "3" ? year3_users.push(user) : null;
//                 user.year == "4" ? year4_users.push(user) : null;
//             }
//         });

//         let bounty_id = [];
//         for (let i = 0; i < 10; i++) {
//             //random number between 0 - 9 for array[index]
//             //math.random will return number between 0 -> 1
//             let a = Math.floor(Math.random() * year1_users.length);
//             let b = Math.floor(Math.random() * year2_users.length);
//             let c = Math.floor(Math.random() * year3_users.length);
//             let d = Math.floor(Math.random() * year4_users.length);

//             // undifined cannot push into db so need to convert it to null
//             year1_users[a] != undefined ? bounty_id.push(year1_users[a]) : bounty_id.push(null);
//             year2_users[b] != undefined ? bounty_id.push(year2_users[b]) : bounty_id.push(null);
//             year2_users[c] != undefined ? bounty_id.push(year2_users[c]) : bounty_id.push(null);
//             year2_users[d] != undefined ? bounty_id.push(year2_users[d]) : bounty_id.push(null);

//             // make sure that the random users will not duplicate so need to delete it from array
//             year1_users.splice(a, 1);
//             year2_users.splice(b, 1);
//             year3_users.splice(c, 1);
//             year4_users.splice(d, 1);
//         }

//         // update ref of bounty to 'bounty' in db
//         await firestore.collection('bounty').doc('list').set({
//             'list' : bounty_id
//         });
//         return null;
// });