const cors = require('cors');
const express = require('express');
const admin = require('../config/admin');
const { user } = require('firebase-functions/lib/providers/auth');
const firestore = admin.firestore();
const bunyan = require("bunyan");
const log = bunyan.createLogger({ name: "myapp" });
const bountyController = express();
bountyController.use(cors({ origin: true }));

// This API is now in cron-job.You can find it in index.js
// bountyController.post('/random', async(req, res) => {
// //     //Random 10 users to push in 'bounty' in db
//     try {
//         let userRef = await firestore.collection('users').get();
//         let users = [];

//         // forEach to .data() in each item in array users
//         userRef.forEach(function (element) {
//             let user = element.data();
//             users.push(user.uid);
//         });
//         console.log(users);

//         let bounty_id = [];
//         for (let i = 0; i < 10; i++) {
//             //random number between 0 - 9 for array[index]
//             let x = Math.floor(Math.random() * users.length); //math.random will return number between 0 -> 1
//             bounty_id.push(users[x]);
//             users.splice(x, 1);
//         }
//         console.log(bounty_id);

//         // update ref of bounty to 'bounty' in db
//         await firestore.collection('bounty').doc('list').set({
//             'list' : bounty_id
//         });

//         res.status(200).send({
//             'statusCode' : '200',
//             'statusText' : 'OK',
//             'error' : false,
//             'message' : 'RANDOM COMPLETE',
//             'data' : bounty_id
//         });

//     } catch (e) {
//         log.info(e);
//         res.status(500).send({
//             'statusCode' : '500',
//             'statusText' : 'Internal Server Error',
//             'error' : true,
//         });
//     }
// });

bountyController.get('', async (req, res) => {
    //To get bounty users in db and put it to front-end as them requst
    try {
        let bountyRef = await firestore.collection('bounty').doc('list').get();
        let bountyData = bountyRef.data();
        let list = bountyData.list;
        //because list that we got is the reference of users in firebase that we push in /random
        //so when we want to get data we can use that referece to get data without using where() function
        let userDoc = [];
        for (let i = 0; i < 10; i++) {
            let users = await list[i].get();
            userDoc.push(users.data());
        }

        res.status(200).send({
            'statusCode' : '200',
            'statusText' : 'OK',
            'error' : false,
            'message' : 'BOUNTY GOT',
            'data' : userDoc
        });

    } catch (e) {
        log.info(e);
        res.status(500).send({
            'statusCode' : '500',
            'statusText' : 'Internal Server Error',
            'error' : true
        });
    }
});

module.exports = bountyController;