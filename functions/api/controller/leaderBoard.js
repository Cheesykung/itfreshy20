const cors = require('cors');
const express = require('express');
const admin = require('../config/admin');
const firestore = admin.firestore();

const ldrBoardController = express();

ldrBoardController.use(cors({ origin: true }));

ldrBoardController.post('/ranking', async (req, res) => {
    try {
        const uid = req.body.uid;
        const year = parseInt(req.body.year);
        const ranksRef = await firestore.collection('ranks');
        const userRef = await firestore.collection("users");
        let snapshot = await userRef.orderBy('point', 'desc').get(); //sort users
        let arrayScore = []; // Create array to store the sequence
        let isRanks = (year === 1) ? "year1Ranking" : "year2Ranking";

        //Add data to the array
        await snapshot.forEach(doc => {
            let isYear = parseInt(doc.data().year);
            if (isYear === year){
                let isPoint = parseInt(doc.data().point);
                let isName = doc.data().name;
                let isUID = doc.data().uid;
                arrayScore.push({'uid':isUID, 'point':isPoint, 'name':isName});
            }
        });

        //Update arrayScore to the 'ranking'
        await ranksRef.doc(isRanks).update({
            'ranking': arrayScore
        });

        //find index of user
        let index = await arrayScore.findIndex((item, id) => {
                    return item.uid === uid;
                });

        // Create data for the response.
        let data = {};
        let name = arrayScore[index].name;
        let point = arrayScore[index].point;
        let rank = index + 1;
        for (let i=0;i<=9;i++) {
            if (i === 9 && index > 9) {
                data["rank10"] = {
                    "name": name,
                    "point": point,
                    "rank": rank
                }
            }
            else {
                data["rank"+(i+1)] = {
                    "name": arrayScore[i].name,
                    "point": arrayScore[i].point,
                    "rank": i + 1
                }
            }
        }
        data["rankMe"] = {
            "name": name,
            "point": point,
            "rank": rank
        };
        res.status(200).send(data);

    } catch (err) {
        res.status(500).send({
            'statusCode': '500',
            'statusText': 'Internal Server Error',
            'error': true
        });
    }
});

module.exports = ldrBoardController;
