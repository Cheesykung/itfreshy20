const cors = require('cors');
//const dayjs = require('dayjs');
const express = require('express');
const admin = require('../config/admin');
const firestore = admin.firestore();
const linksRef = firestore.collection('links');

const AES = require("crypto-js/aes");
const CryptoJS = require("crypto-js");
const { v4: uuidv4 } = require('uuid');

//require('dayjs/locale/th');
//dayjs.locale('th');

const authController = express();

authController.use(cors({ origin: true }));

authController.get('/login', async (req, res) => {
    try {
        let batch = firestore.batch();
        const UID = req.headers.uid;
        //const fbUID = req.headers.fbUID;
        let dataFB = req.headers.data;
        const userRef = firestore.collection('links').doc(UID);
        userRef.get().then(doc => {
            if (doc.exists) { //find the user in the database based on their facebook id
                let obj = JSON.parse(dataFB);
                console.log(obj.fbToken)
                console.log('user found')
                console.log(doc.data())
                res.status(200).send({
                    'statusCode': '200',
                    'statusText': 'OK',
                    'error': false,
                    'message': 'user is found',
                    'data': doc.data()
                })
            } else { //if there is no user found with that facebook id, create them
                console.log('Not pass: '+UID)
                let data = {
                    facebookId: {
                        facebookUID: fbUID ? fbUID : null,
                        facebookToken: null
                    },
                    userProfile: {
                        firstName: null,
                        lastName: null,
                        email: null
                    },
                    //createAt: dayjs().format('DD-MMM-YYYY HH:mm:ss')
                }
                batch.set(userRef, data);
                batch.commit().then(() => {
                    res.status(200).send(data)
                });
            }
        });
    } catch (e) {
        res.status(500).send({
            'statusCode': '500',
            'statusText': 'Internal Server Error',
            'error': true
        });
    }
});

module.exports = authController;