const cors = require('cors');
const express = require('express');
const admin = require('../config/admin');
const { doc } = require('prettier');
const firestore = admin.firestore();

const profileController = express();

profileController.use(cors({ origin: true }));

profileController.post('/create', async (req, res) => {
    try {
        let uid = req.body.uid;
        //let user_uid = req.user.uid;
        //console.log(user_uid);
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

        let userRef = await firestore.collection("users").where("uid", "==", uid).get();
        let ref = '';   // ประกาศตัวแปรมารับค่าที่อยู่ uid เพื่อให้สามารถนำตัวแปรนี้ไปใช้นอกฟังชั่น querySnapshot ได้
                        // ไม่รู้ทำไมมันใช้ return ไม่ได้เหมือนกัน
                        // ตอน re-faq code เดะมาดูละกันนะ ^-^
        userRef.forEach(function (querySnapshot) {
            ref = querySnapshot.id;
        });
        await firestore.collection("users").doc(ref).update(payload);

        res.status(200).send({
            'status' : '200',
            'status code' : 'OK',
            'error' : false,
            'message' : 'PROFILE UPDATED',
            'data' : payload
        });
        return ;

    } catch (e) {
        console.log(e);
        res.status(500).send({
            'status' : '500',
            'error' : true,
            'message' : 'Internal Server Error'
        });
    } return ;
});

profileController.put('/edit/:id', async (req, res) => {
    try {
        let id = req.params.id;
        let {fname, surname, nickname, age, sex, religion, branch, year, contact} = req.body;

        let userRef = await firestore.collection("users").where("id", "==", id).get();
        let ref = '';   // ประกาศตัวแปรมารับค่าที่อยู่ id เพื่อให้สามารถนำตัวแปรนี้ไปใช้นอกฟังชั่น querySnapshot ได้
                        // ไม่รู้ทำไมมันใช้ return ไม่ได้เหมือนกัน
                        // ตอน re-faq code เดะมาดูละกันนะ ^-^
        userRef.forEach(function (querySnapshot) {
            ref = querySnapshot.id;
        });
        console.log(ref);

        let userDoc = firestore.collection('users').doc(ref);
        let haveData = await userDoc.get();

        if (haveData.exists) {
            let userData = haveData.data();

            //condition ? exprIfTrue : exprIfFalse
            fname =  req.body.fname == null ? userData.fname : req.body.fname;
            surname =  req.body.surname == null ? userData.surname : req.body.surname;
            nickname =  req.body.nickname == null ? userData.nickname : req.body.nickname;
            age =  req.body.age == null ? userData.age : req.body.age;
            sex =  req.body.sex == null ? userData.sex : req.body.sex;
            religion =  req.body.religion == null ? userData.religion : req.body.religion;
            branch =  req.body.branch == null ? userData.branch : req.body.branch;
            year =  req.body.year == null ? userData.year : req.body.year;
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
            console.log(payload);
            await userDoc.update(payload);

            res.status(200).send({
                'status' : '200',
                'status code' : 'OK',
                'error' : false,
                'message' : 'update completed',
                'data updated' : payload
            });
            return ;
        } else {
            res.status(404).send({
                'status' : '404',
                'status code' : '404 NOT FOUND',
                'error' : true,
                'message' : 'id not found'
            });
        }
        return ;
    }
    catch (e) {
        console.log(e);
        res.status(500).send({
            'status' : '500',
            'status code' : 'Internal Server Error',
            'error' : true
        });
    } return ;
});

profileController.get('', async (req, res) => {
    try{
    let uid = req.headers.uid;
    let userRef = await firestore.collection("users").where("uid", "==", uid).get();
        let ref = '';   // ประกาศตัวแปรมารับค่าที่อยู่ id เพื่อให้สามารถนำตัวแปรนี้ไปใช้นอกฟังชั่น querySnapshot ได้
                        // ไม่รู้ทำไมมันใช้ return ไม่ได้เหมือนกัน
                        // ตอน re-faq code เดะมาดูละกันนะ ^-^
        userRef.forEach(function (querySnapshot) {
            ref = querySnapshot.id;
        });

    let userDoc = await firestore.collection('users').doc(ref).get();
    let userData = userDoc.data();

    res.status(200).send({
        'status' : '200',
        'status code' : 'OK',
        'error' : false,
        'message' : 'Data found',
        'data' : userData
    });
    return ;
    } catch (e){
        console.log(e);
        res.status(500).send({
            'status' : '500',
            'status code' : 'Internal Server Error',
            'error' : true
        });
    } return ;
        
});

module.exports = profileController;