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
    const userRef = firestore.collection('users');
    let data = {};
    for (let i=0;i<10;i++) {
        let uid = 'uid2'+i;
        data = {
            'uid': uid,
            'year': 2,
            'name': uid,
            'point': i*5,
            'like': ['t1', 't2', 't3', 't4']
        }
        await userRef.doc(uid).set(data);
    }
    res.status(200).send('okkkkkkkkkkkkkkkkkkk')
})



module.exports = toolController;
