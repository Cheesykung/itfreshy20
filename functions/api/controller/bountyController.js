const cors = require('cors');
const express = require('express');
const admin = require('../config/admin');
//const { doc } = require('prettier');
const { user } = require('firebase-functions/lib/providers/auth');
const firestore = admin.firestore();

const bountyController = express();

bountyController.use(cors({ origin: true }));

bountyController.post('/random', async(req, res) => {
    //Random 10 users to push in 'bounty' in db
    try {
        let userRef = await firestore.collection('users').get();
        let users = [];
        userRef.forEach(function (data) {
            let user = data.data();
            users.push(data.id);
        });

        let bounty = [];
        let bounty_id = [];
        for (let i = 0; i < 10; i++) {
            //random number between 0 - 9 for array[index]
            let x = Math.floor(Math.random() * users.length);

            bounty_id.push(users[x]);
            bounty.push(firestore.collection('users').doc(users[x])); // push address of users in bounty array
        }

        // update ref of bounty to 'bounty' in db
        await firestore.collection('bounty').doc('list').set({
            'list' : bounty
        });

        res.status(200).send({
            'statusCode' : '200',
            'statusText' : 'OK',
            'error' : false,
            'message' : 'RANDOM COMPLETE',
            'data' : bounty_id
        });

    } catch (e) {
        log.info(e);
        res.status(500).send({
            'statusCode' : '500',
            'statusText' : 'Internal Server Error',
            'error' : true,
        });
    }
});

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
        console.log(e);
        res.status(500).send({
            'statusCode' : '500',
            'statusText' : 'Internal Server Error',
            'error' : true
        });
    }
});

module.exports = bountyController;