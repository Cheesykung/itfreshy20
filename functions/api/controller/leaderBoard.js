const cors = require('cors');
const express = require('express');
const admin = require('../config/admin');
const firestore = admin.firestore();
const ldrBoardController = express();
const bunyan = require("bunyan");
const log = bunyan.createLogger({ name: "myapp" });
const minify = require("express-minify");
const { auth } = require('firebase-admin');
const authService = auth();

ldrBoardController.use(function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "https://itfreshy2020.web.app");
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, OPTIONS, PUT, PATCH, DELETE"
    );
    res.setHeader(
        "Access-Control-Allow-Headers",
        "X-Requested-With,Content-Type,Authorization"
    );
    res.setHeader("Access-Control-Allow-Credentials", true);
    next();
});

ldrBoardController.use(minify());
ldrBoardController.use(cors({ origin: true }));
ldrBoardController.post('/ranking',isLoggedIn, async (req, res) => {
    try {
        const uid = req.user.uid;
        //const year = parseInt(req.body.year);

        const ranksRef = await firestore.collection('ranks');
        const userRef = await firestore.collection("users");
        //let year = await userRef.doc(uid).get();
        const haveUID = await userRef.doc(uid).get();
        let year = parseInt(await haveUID.data().year);

        if (haveUID.exists) {
            let snapshot = await userRef.orderBy('point', 'desc').get(); //sort users
            let arrayScoreY1 = []; // Create array to store the sequence
            let arrayScoreY2 = []; //year2
            //console.log(snapshot)

            //Add data to the array
            await snapshot.forEach(doc => {
                let isYear = doc.data().year ? parseInt(doc.data().year): 0;
                let isPoint = doc.data().point ? parseInt(doc.data().point): 0;
                let isName = doc.data().name ? doc.data().name: null;
                let isPic = doc.data().pic? doc.data().pic: null;
                let isUID = doc.data().uid;
                if (isYear === 1){
                    arrayScoreY1.push({'uid':isUID, 'point':isPoint, 'name':isName, 'pic': isPic});
                }
                else if (isYear === 2) {
                    arrayScoreY2.push({'uid':isUID, 'point':isPoint, 'name':isName, 'pic': isPic});
                }
            });

            //Update arrayScore to the 'ranking'
            ranksRef.doc('year1Ranking').update({
                'ranking': arrayScoreY1
            });
            ranksRef.doc('year2Ranking').update({
                'ranking': arrayScoreY2
            });

            //find index of user
            let indexY1, indexY2;
            if (year === 1 || year === 2) {
                indexY1 = await arrayScoreY1.findIndex((item, id) => {
                    return item.uid === uid;
                });
                indexY2 = await arrayScoreY2.findIndex((item, id) => {
                    return item.uid === uid;
                });
            }
            else {
                indexY1 = -1;
                indexY2 = -1;
            }

            // Create data for the response.
            let rankingY1 = setRanking(arrayScoreY1, indexY1);
            //console.log(rankingY1)

            let rankingY2 = setRanking(arrayScoreY2, indexY2);
            //console.log(indexY2)
            let rankMe = {};
            if (year == 1) {
                rankMe = {
                    "name": arrayScoreY1[indexY1].name,
                    "point": arrayScoreY1[indexY1].point,
                    "pic": arrayScoreY1[indexY1].pic,
                    "rank": indexY1 + 1
                };
            }
            else if (year == 2) {
                console.log('pass')
                rankMe = {
                    "name": arrayScoreY2[indexY2].name,
                    "point": arrayScoreY2[indexY2].point,
                    "pic": arrayScoreY2[indexY2].pic,
                    "rank": indexY2 + 1
                };
            }
            else {
                await userRef.doc(uid).get().then(doc => {
                    rankMe = {
                        "name": doc.data().name,
                        "point": doc.data().point,
                        "pic": doc.data().pic,
                        "rank": null
                    };
                });
            }

            //console.log('rankeme-->'+rankMe)

            res.status(200).send({
                    'year1': rankingY1,
                    'year2': rankingY2,
                    'rankMe': rankMe
                });
        }
        else {
            res.status(404).send({
                'statusCode': '404',
                'statusText': 'User not found',
                'error': true
            })
        }



    } catch (err) {
        res.status(500).send({
            'statusCode': '500',
            'statusText': 'Internal Server Error',
            'error': true
        });
    }
});

function setRanking(array, index) {
    let data = [];
    //let end = (array.length <= 9) ? array.length - 1: 9;
    for (let i=0;i<=9;i++) {
        if (i === 9 && index > 9) {
            data[i] = {
                "name": array[index].name ? array[index].name: null,
                "point": array[index].point ? array[index].point: null,
                "pic": array[index].pic ? array[index].pic: null,
                "rank": index + 1
            }
        }
        else {
            data[i] = (i < array.length) ? {
                "name": array[i].name,
                "point": array[i].point,
                "pic": array[i].pic ? array[i].pic: null,
                "rank": i + 1
            } : {
                "name": null,
                "point": 0,
                "pic": null,
                "rank": i+1
            };
        }
    }
    return data;
}

async function isLoggedIn(req, res, next) {
    const idToken = req.header('FIREBASE_AUTH_TOKEN');
    let decodedIdToken;
    try {
        decodedIdToken = await authService.verifyIdToken(idToken);
    } catch (error) {
        next(error);
        return;
    }
    req.user = decodedIdToken;
    next();
}

module.exports = ldrBoardController;
