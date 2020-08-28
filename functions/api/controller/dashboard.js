const cors = require('cors');
const express = require('express');
const admin = require('../config/admin');
const firestore = admin.firestore();

const dashboardController = express();

dashboardController.use(cors({ origin: true }));


dashboardController.post('/test', async (req, res) => {
    let name = req.body.name;
    let age = req.body.age;
    let userRef = firestore.collection('dashboard');
    //let snap = await userRef.get();
    let data = {
        "name": name,
        "age": age,
        "point": 0
    }
    userRef.add(data);

})



module.exports = dashboardController;
