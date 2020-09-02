const cors = require('cors');
const express = require('express');
const admin = require('../config/admin');
const firestore = admin.firestore();

const toolController = express();

toolController.use(cors({ origin: true }));


toolController.post('test', async (req, res) => {
    

})



toolController.get('/delete', async (req, res) => {
    try {
        const userRef = firestore.collection('users');
        res.status(200).send('okkkkkkkkk');
    } catch (e) {
        res.status(500).send('nooooooooooo');
    }
})

toolController.post('/add', async (req, res) => {
    const userRef = firestore.collection('testRandom');
    let data = {};
    for (let i=0;i<5;i++) {
        let uid = 'uid'+i;
        data = {
            'uid': uid,
            'year': 1,
            'name': uid,
            'point': i*5,
            'scoreMe': [
                {'uid':'uid20','point': Math.floor(Math.random() * 100)},
                {'uid':'uid21','point': Math.floor(Math.random() * 100)},
                {'uid':'uid22','point': Math.floor(Math.random() * 100)},
                {'uid':'uid23','point': Math.floor(Math.random() * 100)}
                ],
            'scoreP': [
                {'uid':'uid20','point': Math.floor(Math.random() * 100)},
                {'uid':'uid21','point': Math.floor(Math.random() * 100)},
                {'uid':'uid22','point': Math.floor(Math.random() * 100)},
                {'uid':'uid23','point': Math.floor(Math.random() * 100)}
            ]
        }
        await userRef.doc(uid).set(data);
    }
    res.status(200).send('okkkkkkkkkkkkkkkkkkk')
})



module.exports = toolController;
