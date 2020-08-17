const cors = require('cors');
const express = require('express');
const admin = require('../config/admin');
const firestore = admin.firestore();

const profileController = express();

profileController.use(cors({ origin: true }));

profileController.post('/create', async (req, res) => {
    try {
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

        let userRef = firestore.collection('temp_user').doc(id);
        await userRef.set(payload);

        res.status(200).send({
            'status' : '200',
            'error' : false,
            'message' : 'PROFILE CREATED',
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

module.exports = profileController;