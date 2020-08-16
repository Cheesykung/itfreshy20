const cors = require('cors');
const express = require('express');
const admin = require('../config/admin');
const firestore = admin.firestore();

const authController = express();

authController.use(cors({ origin: true }));

authController.get('/test', async (req, res) => {
    try {
        const UID = req.headers.uid;
        const userRef = firestore.collection('links').doc(UID);
        userRef.get().then(doc => {
            if (doc.exists) {
                console.log('user found')
                console.log(doc.data())
                res.status(200).send({
                    'statusCode': '200',
                    'statusText': 'OK',
                    'error': false,
                    'message': 'user is found',
                    'data': doc.data()
                })
            } else {
                console.log('Not pass: '+UID)
                res.status(500).send({
                    'statusCode': '404',
                    'statusText': 'Not Found',
                    'error': true,
                    'message': 'user not found'
                })
            }
        })
    } catch (e) {
        res.status(500).send({
            'statusCode': '500',
            'statusText': 'Internal Server Error',
            'error': true
        });
    }
});

module.exports = authController;