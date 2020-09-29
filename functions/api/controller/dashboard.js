const cors = require('cors');
const express = require('express');
const admin = require('../config/admin');
const firestore = admin.firestore();
const path = require("path");

const dashboardController = express();

dashboardController.use(cors({ origin: true }));

dashboardController.set("views", path.join(__dirname, "views"));
dashboardController.set("view engine", "ejs");

dashboardController.get('/home', async (req, res) => {
    try{
        let userRef = firestore.collection('allstats').doc('stat');
        let snap = await userRef.get();

        res.render('dashboard', {
            visit: snap.data().allvisitor,
            user: snap.data().alluser,
            gen: snap.data().allgenerate,
            bounty: snap.data().allbounty,
            scan: snap.data().allscan
        });


        const observer = firestore.collection('allstats').onSnapshot(querySnapshot => {
            querySnapshot.docChanges().forEach(change => {
            var data = change.doc.data();
            console.log(data);
            });
        });
        return;

    }catch(e){
        res.status(500).send({
            'statusCode': '500',
            'statusText': 'Internal Server Error',
            'error': true,
            'message': 'FUCTION NOT FOUND'
        });
    }
})


// dashboardController.post('/register', async (req, res) => {
//     try{
//         let {firstname, lastname, studentID, social, socialFake, hintText, hunterID} = req.body;
//         let infoUser = firestore.collection('form17').doc(studentID);
//         let playload = {
//             "firstname": firstname,
//             "lastname": lastname,
//             "studentID": studentID,
//             "socialFake": socialFake,
//             "hintText": hintText,
//              "social": social,
//              "hunterID": hunterID
//         };
//         console.log(playload);
//         infoUser.set(playload);
//     }
//     catch(e){
//         console.log("Error!");
//     }
// })

module.exports = dashboardController;
