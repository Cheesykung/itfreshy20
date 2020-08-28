const cors = require('cors');
const express = require('express');
const admin = require('../config/admin');
//const { doc } = require('prettier');
const firestore = admin.firestore();
const profileController = express();
const bunyan = require("bunyan");
const log = bunyan.createLogger({ name: "myapp" });
const passport = require("passport");

profileController.use(passport.initialize());
profileController.use(passport.session());
profileController.use(cors({ origin: true }));

profileController.post('/create', async (req, res) => {
    //Create users profile
    try {
        let uid = req.headers.uid; //require front-end send uid to know where to update the info
        let userRef = firestore.collection('users').doc(uid);
        let haveUID = await userRef.get();

        //Check that we have this uid in db or not?
        if (haveUID.exists) {
            let { id, fname, surname, nickname, age, sex, religion, branch, year, contact, like1, like2, like3, like4 } = req.body;

            let payload = {
                'id': id,
                'fname': fname,
                'surname': surname,
                'nickname': nickname,
                'age': age,
                'sex': sex,
                'religion': religion,
                'branch': branch,
                'year': year,
                'contact': contact,
                'like': [like1, like2, like3, like4]
            };
            // upload payload that have all info to db
            await userRef.update(payload);

            // update info in 'scans' db
            // if input year = 1 or 2
            if (year == 1 || year == 2) {
                let scan = [];
                scan.push(uid);
                await firestore.collection('scans').doc(uid).update({
                    'scan': scan,
                    'uid': uid
                });

                // if input year = 1
                // Update doc in db 'secretfromuser' to get random gate
                if (year == 1) {
                    await firestore.collection('secertfromuser').doc(id).update({
                        'family': "",
                        'uid': uid
                    });
                }
            }

            res.status(200).send({
                'statusCode': '200',
                'statusText': 'OK',
                'error': false,
                'message': 'PROFILE UPDATED',
                'data': payload
            });
            return;
        } else {
            res.status(400).send({
                'statusCode': '404',
                'statusText': 'Not Found',
                'error': true,
                'message': 'UID NOT FOUND'
            });
            return;
        }
    } catch (e) {
        log.info(e);
        res.status(500).send({
            'statusCode': '500',
            'statusText': 'Internal Server Error',
            'error': true
        });
    } return;
});
profileController.get("/checka", (req, res) => {
    res.send({ data: req.user, session: req.session })
    console.log(req.user)
    return;
});
profileController.put('/edit', async (req, res) => {
    //Edit(Change info) users profile on db
    try {
        let uid = req.headers.uid; //require front-end send uid to know where to update the info
        let { fname, surname, nickname, age, sex, religion, branch, year, contact } = req.body;
        // อันไหนที่ไม่ต้องการให้แก้ให้ก็ให้ frontend lock ไว้ เอาเเล้วกันนะ!

        let userRef = firestore.collection('users').doc(uid);
        let haveUID = await userRef.get();

        //Check that we have this uid in db or not?
        if (haveUID.exists) {
            let userData = haveUID.data(); //that UID exist on db so let's get it's data

            //Ternary operation
            //syntax: condition ? exprIfTrue : exprIfFalse
            //This mean if front-end didn't send anything we gonna let's each info be the same as on db
            //but if front-end send changed info we gonna put it to db by payload
            fname = req.body.fname == null ? userData.fname : req.body.fname;
            surname = req.body.surname == null ? userData.surname : req.body.surname;
            nickname = req.body.nickname == null ? userData.nickname : req.body.nickname;
            age = req.body.age == null ? userData.age : req.body.age;
            sex = req.body.sex == null ? userData.sex : req.body.sex;
            religion = req.body.religion == null ? userData.religion : req.body.religion;
            branch = userData.branch;  //cannot change so we return the same data to db
            year = userData.year;   //cannot change so we return the same data to db
            contact = req.body.contact == null ? userData.contact : req.body.contact;

            let payload = {
                'fname': fname,
                'surname': surname,
                'nickname': nickname,
                'age': age,
                'sex': sex,
                'religion': religion,
                'branch': branch,
                'year': year,
                'contact': contact
            };
            await userRef.update(payload);

            res.status(200).send({
                'statusCode': '200',
                'statusText': 'OK',
                'error': false,
                'message': 'PROFILE UPDATED',
                'data updated': payload
            });
            return;
            // If uid is not exist on db then mean the we don't have that uid on db
        } else {
            res.status(404).send({
                'statusCode': '404',
                'statusText': '404 Not Found',
                'error': true,
                'message': 'UID NOT FOUND'
            });
        }
        return;
    }
    catch (e) {
        log.info(e);
        res.status(500).send({
            'statusCode': '500',
            'statusText': 'Internal Server Error',
            'error': true
        });
    } return;
});

profileController.get('', async (req, res) => {
    //To get users info in db and put it to front-end as them requst
    try {
        let uid = req.headers.uid;
        let userDoc = await firestore.collection('users').doc(uid).get();

        if (userDoc.exists) {
            let userData = userDoc.data();

            res.status(200).send({
                'statusCode': '200',
                'statusText': 'OK',
                'error': false,
                'message': 'DATA FOUND',
                'data': userData
            });
            return;
        } else {
            res.status(404).send({
                'statusCode': '404',
                'statusText': 'Not Found',
                'error': true,
                'message': 'UID NOT FOUND'
            });
        } return;
    } catch (e) {
        log.info(e);
        res.status(500).send({
            'statusCode': '500',
            'statusText': 'Internal Server Error',
            'error': true
        });
        return;
    }
});

// One-use function
// To Create All year1 profile
// profileController.post('/total', async (req, res) => {
//     // Create all year1 users in db 'secertfromuser' to keep info family and uid
//     try {
//         let userRef = firestore.collection('secertfromuser');
//         let batch = firestore.batch();

//         for (let i = 63070001; i < 63070252; i++) {
//             let ref = i.toString();
//             batch.set(userRef.doc(ref), {'family' : '', 'uid':''});
//         }
//         await batch.commit();

//         res.status(200).send({
//             'statusCode' : '200',
//             'statusText' : 'OK',
//             'error' : false,
//             'message' : 'All Year1 users has been created'
//             }); 

//     } catch (e) {
//         log.info(e);
//         res.status(500).send({
//             'statusCode' : '500',
//             'statusText' : 'Internal Server Error',
//             'error' : true
//         });
//         return ;
//     }
// });


// Another One-Used function
// To rnadom gate of year1 users
// profileController.post('/family/random', async (req, res) => {
//     try {
//         let gate = ['AND', 'AND', 'AND', 'AND', 'AND', 'AND', 'AND', 'AND', 'AND', 'AND', 'AND', 'AND', 'AND',
//         'AND', 'AND', 'AND', 'AND', 'AND', 'AND', 'AND', 'AND', 'AND', 'AND', 'AND', 'AND', 'AND', 'AND', 'AND',
//         'AND', 'AND', 'AND', 'AND', 'AND', 'AND', 'AND', 'AND', 'AND', 'AND', 'AND', 'AND', 'AND', 'AND', 'AND',
//         'AND','AND', 'AND', 'AND', 'AND', 'AND', 'AND', 'AND', 'AND', 'AND', 'AND', 'AND', 'AND', 'AND', 'AND',
//         'AND', 'AND', 'AND', 'AND', 'AND','OR', 'OR', 'OR', 'OR', 'OR', 'OR', 'OR', 'OR', 'OR', 'OR', 'OR', 'OR',
//         'OR', 'OR', 'OR', 'OR', 'OR', 'OR', 'OR', 'OR', 'OR', 'OR', 'OR', 'OR', 'OR', 'OR', 'OR', 'OR', 'OR', 'OR',
//         'OR', 'OR', 'OR', 'OR', 'OR', 'OR', 'OR', 'OR', 'OR', 'OR', 'OR', 'OR', 'OR', 'OR', 'OR', 'OR', 'OR', 'OR',
//         'OR', 'OR', 'OR', 'OR', 'OR', 'OR', 'OR', 'OR', 'OR', 'OR', 'OR', 'OR', 'OR', 'OR', 'OR','NOR', 'NOR', 'NOR',
//         'NOR', 'NOR', 'NOR', 'NOR', 'NOR', 'NOR', 'NOR', 'NOR', 'NOR', 'NOR', 'NOR', 'NOR', 'NOR', 'NOR', 'NOR', 'NOR',
//         'NOR', 'NOR', 'NOR', 'NOR', 'NOR', 'NOR', 'NOR', 'NOR', 'NOR', 'NOR', 'NOR', 'NOR', 'NOR', 'NOR', 'NOR', 'NOR',
//         'NOR', 'NOR', 'NOR', 'NOR', 'NOR', 'NOR', 'NOR', 'NOR', 'NOR', 'NOR', 'NOR', 'NOR', 'NOR', 'NOR', 'NOR', 'NOR',
//         'NOR', 'NOR', 'NOR', 'NOR', 'NOR', 'NOR', 'NOR', 'NOR', 'NOR', 'NOR', 'NOR', 'NOR', 'NOT', 'NOT', 'NOT', 'NOT',
//         'NOT', 'NOT', 'NOT', 'NOT', 'NOT', 'NOT', 'NOT', 'NOT', 'NOT', 'NOT', 'NOT', 'NOT', 'NOT', 'NOT', 'NOT', 'NOT',
//         'NOT', 'NOT', 'NOT', 'NOT', 'NOT', 'NOT', 'NOT', 'NOT', 'NOT', 'NOT', 'NOT', 'NOT', 'NOT', 'NOT', 'NOT', 'NOT',
//         'NOT', 'NOT', 'NOT', 'NOT', 'NOT', 'NOT', 'NOT', 'NOT', 'NOT', 'NOT', 'NOT', 'NOT', 'NOT', 'NOT', 'NOT', 'NOT',
//         'NOT', 'NOT', 'NOT', 'NOT', 'NOT', 'NOT', 'NOT', 'NOT', 'NOT', 'NOT'];

//         let batch = firestore.batch();

//         for (let i = 63070001; i < 63070252; i++) {
//             let index = Math.floor(Math.random() * gate.length);
//             let user_gate = gate[index];
//             gate.splice(index, 1);
//             let ref = firestore.collection('secertfromuser').doc(i.toString());
//             console.log(i.toString() + "'s Gate is " + user_gate);
//             batch.update(ref, {family: user_gate});
//         }
//         batch.commit();

//         res.status(200).send({
//             'statusCode' : '200',
//             'statusText' : 'OK',
//             'error' : false,
//             'message' : 'Random Complete',
//             }); 
//         return ;
//     } catch (e) {


//         console.log(e);
//         res.status(500).send({
//             'statusCode' : '500',
//             'statusText' : 'Internal Server Error',
//             'error' : true
//         });
//         return ;
//     }
// });

//exports this function index.js
module.exports = profileController;