const cors = require('cors');
const express = require('express');
const admin = require('../config/admin');
const firestore = admin.firestore();

const randomController = express();

randomController.use(cors({ origin: true }));
randomController.get('/random', async (req, res) => {
    try {
        const ranksRef = await firestore.collection('ranks').doc('year1Ranking');
        const userRef = await firestore.collection('users');
        await ranksRef.get().then(doc => {
            let length = doc.data().ranking.length;
            for (let i=0; i<length; i++) {
                let index  = doc.data().ranking[i].uid;
                userRef.doc(index).get().then(doc => {
                    console.log(doc.data().like);
                })
            }
        })
        res.status(200).send('okkkkkkkkk');
    } catch (e) {
        res.status(500).send('nooooooooooo');
    }
})

module.exports = randomController;
