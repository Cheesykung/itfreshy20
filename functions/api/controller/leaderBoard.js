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
        let arrayScoreY2 = []; //year2
        //let isRanks = (year === 1) ? "year1Ranking" : "year2Ranking";

        //Add data to the array
        await snapshot.forEach(doc => {
            let isYear = parseInt(doc.data().year);
            if (isYear === 1){
                let isPoint = parseInt(doc.data().point);
                let isName = doc.data().name;
                let isUID = doc.data().uid;
                arrayScore.push({'uid':isUID, 'point':isPoint, 'name':isName});
            }
            else if (isYear === 2) {
                let isPoint = parseInt(doc.data().point);
                let isName = doc.data().name;
                let isUID = doc.data().uid;
                arrayScoreY2.push({'uid':isUID, 'point':isPoint, 'name':isName});
            }
        });

        //Update arrayScore to the 'ranking'
        // await ranksRef.doc(isRanks).update({
        //     'ranking': arrayScore
        // });
        await ranksRef.doc('year1Ranking').update({
            'ranking': arrayScore
        });
        await ranksRef.doc('year2Ranking').update({
            'ranking': arrayScoreY2
        });


        //find index of user
        let index1, index2;
            if (year === 1 || year === 2) {
                index1 = await arrayScore.findIndex((item, id) => {
                    return item.uid === uid;
                });
                console.log(index1)

                index2 = await arrayScoreY2.findIndex((item, id) => {
                    return item.uid === uid;
                });
            }
            else {
                index1 = -1;
                index2 = -1;
            }


        // Create data for the response.
        let data1 = {};
        // let name1 = arrayScore[index].name;
        // let name2 = arrayScoreY2[index].name;
        // let point1 = arrayScore[index].point;
        // let point2 = arrayScoreY2[index].point;
        // let rank1 = index1 + 1;
        // let rank2 = index2 + 1;
        for (let i=0;i<=9;i++) {
            if (i === 9 && index1 > 9) {
                data1["rank10"] = {
                    "name": arrayScore[index1].name,
                    "point": arrayScore[index1].point,
                    "rank": index1 + 1
                }
            }
            else {
                data1["rank"+(i+1)] = {
                    "name": arrayScore[i].name,
                    "point": arrayScore[i].point,
                    "rank": i + 1
                }
            }
        }
        let data2 = {};
        for (let i=0;i<=9;i++) {
            if (i === 9 && index2 > 9) {
                data2["rank10"] = {
                    "name": arrayScoreY2[index2].name,
                    "point": arrayScoreY2[index2].point,
                    "rank": index2 + 1
                }
            }
            else {
                data2["rank"+(i+1)] = {
                    "name": arrayScoreY2[i].name,
                    "point": arrayScoreY2[i].point,
                    "rank": i + 1
                }
            }
        }
        let rankMe = {}
        if (year == 1) {
            rankMe = {
                "name": arrayScore[index1].name,
                "point": arrayScore[index1].point,
                "rank": index1 + 1
            };
        }
        else if (year == 2) {
            rankMe = {
                "name": arrayScoreY2[index2].name,
                "point": arrayScoreY2[index2].point,
                "rank": index2 + 1
            };
        }
        else {
            let index = await userRef.doc('2831437720507073').get();
            rankMe = {
                "name": index.data().name,
                "point": index.data().point,
                "rank": null
            };
            console.log(rankMe)
        }

        res.status(200).send({
            'year1': data1,
            'year2': data2,
            'rankMe': rankMe
        });

    } catch (err) {
        res.status(500).send({
            'statusCode': '500',
            'statusText': 'Internal Server Error',
            'error': true
        });
    }
});

module.exports = ldrBoardController;
