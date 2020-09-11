const cors = require('cors');
const express = require('express');
const admin = require('../config/admin');
const { user } = require('firebase-functions/lib/providers/auth');
const firestore = admin.firestore();
const bunyan = require("bunyan");
// const { directive } = require('vue/types/umd');
const { bounty } = require('../..');
const log = bunyan.createLogger({ name: "myapp" });
const bountyController = express();
bountyController.use(cors({ origin: true }));

// This API is now in cron-job.You can find it in index.js
bountyController.post('/random', async(req, res) => {
    //Random 10 users to push in 'bounty' in db
    try {
        let userRef = await firestore.collection('users').get();
        let year1_users = [];
        let year2_users = [];
        let year3_users = [];
        let year4_users = [];

        // forEach to .data() in each item in array users
        userRef.forEach(function (element) {
            let user = element.data();
            if (user.newuser == 0) {
                user.year == "1" ? year1_users.push(user.uid) : null;
                user.year == "2" ? year2_users.push(user.uid) : null;
                user.year == "3" ? year3_users.push(user.uid) : null;
                user.year == "4" ? year4_users.push(user.uid) : null;
            }
        });

        let bounty_id = [];
        for (let i = 0; i < 10; i++) {
            //random number between 0 - 9 for array[index]
            //math.random will return number between 0 -> 1
            let a = Math.floor(Math.random() * year1_users.length);
            year1_users[a] != undefined ? bounty_id.push(year1_users[a]) : bounty_id.push(null);
            year1_users.splice(a, 1);
            
            let b = Math.floor(Math.random() * year2_users.length);
            year2_users[b] != undefined ? bounty_id.push(year2_users[b]) : bounty_id.push(null);
            year2_users.splice(b, 1);

            let c = Math.floor(Math.random() * year3_users.length);
            year3_users[c] != undefined ? bounty_id.push(year3_users[c]) : bounty_id.push(null);
            year3_users.splice(c, 1);
            
            let d = Math.floor(Math.random() * year4_users.length);
            year4_users[d] != undefined ? bounty_id.push(year4_users[d]) : bounty_id.push(null);
            year4_users.splice(d, 1);
        }

        // update ref of bounty to 'bounty' in db
        await firestore.collection('bounty').doc('list').set({
            'list' : bounty_id
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

        let all_bounty = [];
        for (let i = 0; i < list.length; i++) {
            if (list[i] != null) {
                let user = await firestore.collection('users').doc(list[i]).get();
                let user_data = user.data();
                let payload = {
                    'fname' : user_data.fname,
                    'surname' : user_data.surname,
                    'nickname' : user_data.nickname,
                    'age' : user_data.age,
                    'year' : user_data.year,
                    'branch' : user_data.branch,
                    'contact' : user_data.contact,
                    'pic' : user_data.pic,
                };
                all_bounty.push(payload);
            }
        }

        res.status(200).send({
            'statusCode' : '200',
            'statusText' : 'OK',
            'error' : false,
            'message' : 'BOUNTY GOT',
            'data' : all_bounty
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