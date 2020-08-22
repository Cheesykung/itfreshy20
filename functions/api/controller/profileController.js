const cors = require('cors');
const express = require('express');
const admin = require('../config/admin');
const { doc } = require('prettier');
const firestore = admin.firestore();
const profileController = express();
profileController.use(cors({ origin: true }));

profileController.post('/create', async (req, res) => {
    //Create users profile
    try {
        let uid = req.headers.uid; //require front-end send uid to know where to update the info
        let userRef = firestore.collection('users').doc(uid);
        let haveUID = await userRef.get();

        //Check that we have this uid in db or not?
        if (haveUID.exists){
            let {id, fname, surname, nickname, age, sex, religion, branch, year, contact} = req.body;

            let payload = {
                'id' : id,
                'fname' : fname,
                'surname' : surname,
                'nickname' : nickname,
                'age' : age,
                'sex' : sex,
                'religion' : religion,
                'branch' : branch,
                'year' : year,
                'contact' : contact
            };
            // upload payload that have all info to db
            await userRef.update(payload);

            res.status(200).send({
                'statusCode' : '200',
                'statusText' : 'OK',
                'error' : false,
                'message' : 'PROFILE UPDATED',
                'data' : payload
            }); 
            return ;
        } else {
            res.status(400).send({
                'statusCode' : '404',
                'statusText' : 'Not Found',
                'error' : true,
                'message' : 'UID NOT FOUND'
            }); 
            return ;
        }
    } catch (e) {
        log.info(e);
        res.status(500).send({
            'statusCode' : '500',
            'statusText' : 'Internal Server Error',
            'error' : true
        });
    } return ;
});

profileController.put('/edit', async (req, res) => {
    //Edit(Change info) users profile on db
    try {
        let uid = req.headers.uid; //require front-end send uid to know where to update the info
        let {fname, surname, nickname, age, sex, religion, branch, year, contact} = req.body;
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
            fname =  req.body.fname == null ? userData.fname : req.body.fname;
            surname =  req.body.surname == null ? userData.surname : req.body.surname;
            nickname =  req.body.nickname == null ? userData.nickname : req.body.nickname;
            age =  req.body.age == null ? userData.age : req.body.age;
            sex =  req.body.sex == null ? userData.sex : req.body.sex;
            religion =  req.body.religion == null ? userData.religion : req.body.religion;
            branch =  userData.branch;  //cannot change so we return the same data to db
            year = userData.year;   //cannot change so we return the same data to db
            contact =  req.body.contact == null ? userData.contact : req.body.contact;

            let payload = {
                'fname' : fname,
                'surname' : surname,
                'nickname' : nickname,
                'age' : age,
                'sex' : sex,
                'religion' : religion,
                'branch' : branch,
                'year' : year,
                'contact' : contact
            };
            await userRef.update(payload);

            res.status(200).send({
                'statusCode' : '200',
                'statusText' : 'OK',
                'error' : false,
                'message' : 'PROFILE UPDATED',
                'data updated' : payload
            });
            return ;
        // If uid is not exist on db then mean the we don't have that uid on db
        } else {
            res.status(404).send({
                'statusCode' : '404',
                'statusText' : '404 Not Found',
                'error' : true,
                'message' : 'UID NOT FOUND'
            });
        }
        return ;
    }
    catch (e) {
        log.info(e);
        res.status(500).send({
            'statusCode' : '500',
            'statusText' : 'Internal Server Error',
            'error' : true
        });
    } return ;
});

profileController.get('', async (req, res) => {
    //To get users info in db and put it to front-end as them requst
    try{
    let uid = req.headers.uid;
    let userDoc = await firestore.collection('users').doc(uid).get();

    if (userDoc.exists){
        let userData = userDoc.data();

        res.status(200).send({
            'statusCode' : '200',
            'statusText' : 'OK',
            'error' : false,
            'message' : 'DATA FOUND',
            'data' : userData
            }); 
        return ;
    } else {
        res.status(404).send({
            'statusCode' : '404',
            'statusText' : 'Not Found',
            'error' : true,
            'message' : 'UID NOT FOUND'
            });
        } return ;
    } catch (e){
        log.info(e);
        res.status(500).send({
            'statusCode' : '500',
            'statusText' : 'Internal Server Error',
            'error' : true
        });
        return ;
    }  
});

//exports this function index.js
module.exports = profileController;