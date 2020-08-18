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
        let {id, name, surname, nickname, age, sex, religion, branch, year, contact} = req.body;

        let payload = {
            'id' : id,
            'name' : name,
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
        let ref = '';   // ประกาศตัวแปรมารับค่าที่อยู่ id เพื่อให้สามารถนำตัวแปรนี้ไปใช้นอกฟังชั่น querySnapshot ได้
                        //ไม่รู้ทำไมมันใช้ return ไม่ได้เหมือนกัน
                        // ตอน re-faq code เดะมาดูละกันนะ ^-^
        userRef.forEach(function (querySnapshot) {
            ref = querySnapshot.id;
        });
        await firestore.collection("users").doc(ref).update(payload);

        res.status(200).send({
            'status' : '200',
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

/*profileController.post('/edit', async (req, res) => {
    try {
        let userRef = firestore.collection('temp_user').doc(req.body.uid);
        let userDoc = (await userRef.get()).data();
        console.log(userDoc);
    }
     catch (e) {
        
    } return ;
});
*/
module.exports = profileController;