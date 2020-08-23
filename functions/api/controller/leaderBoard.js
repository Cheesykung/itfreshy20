const cors = require('cors');
//const dayjs = require('dayjs');
const express = require('express');
const admin = require('../config/admin');
const firestore = admin.firestore();

//require('dayjs/locale/th');
//dayjs.locale('th');

const ldrBoardController = express();

ldrBoardController.use(cors({ origin: true }));

ldrBoardController.post('/ranking', async (req, res) => {
    try {
        let uid = req.body.uid;
        let year = parseInt(req.body.year);
        const ranksRef = await firestore.collection('ranks');
        const userRef = await firestore.collection("users");
        //const snapshot = await userRef.where("point", ">=", 0).orderBy('point', 'desc').get();
        let snapshot = await userRef.orderBy('point', 'desc').get();
        let arrayScore = []; // เก็บใน array เพื่อจัดลำดับ
        let isRanks = (year === 1) ? "year1Ranking" : "year2Ranking";

        await snapshot.forEach(doc => {
            let isYear = parseInt(doc.data().year);
            if (isYear === year){
                let isPoint = parseInt(doc.data().point) ? parseInt(doc.data().point) : 0;
                let isName = doc.data().name ? doc.data().name : null;
                let isUID = doc.data().uid;
                arrayScore.push({'uid':isUID, 'point':isPoint, 'name':isName});
            }
        });

        await ranksRef.doc(isRanks).update({
            'ranking': arrayScore
        });
        console.log(arrayScore);

        const ranks = await ranksRef.doc(isRanks);
        await ranks.get().then(doc => {
            let index = doc.data().ranking.findIndex((item, id) => { //หา index ของ user ที่ต้องการ
                return item.uid === uid;
            })
            console.log("Index:"+index)

            let data = {}
            let name = doc.data().ranking[index].name ? doc.data().ranking[index].name : null
            let point = doc.data().ranking[index].point ? doc.data().ranking[index].point: 0
            let rank = index + 1
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
                        "name": doc.data().ranking[i].name ? doc.data().ranking[i].name : null,
                        "point": doc.data().ranking[i].point ? doc.data().ranking[i].point: 0,
                        "rank": i + 1
                    }
                }
            }
            data["rankMe"] = {
                "name": name,
                "point": point,
                "rank": rank
            }

            res.status(200).send(data)
        }).catch((err) => {
            res.status(400).send({
                'statusCode': '400',
                'statusText': 'Bad Request',
                'error': true,
                'message': 'response data error'
            })
        });
    } catch (e) {
        res.status(500).send({
            'statusCode': '500',
            'statusText': 'Internal Server Error',
            'error': true
        });
    }
});

// ldrBoardController.post('/newuser', async (req, res) => {
//     try {
//         let {name, uid, point, year,} = req.body;
//         const ranksRef = await firestore.collection('ranks').doc('ranking');
//
//         //const snapshot = await userRef.where("point", ">=", 0).orderBy('point', 'desc').get();
//         // ถ้าเข้าทุก collection ได้มั้ยหว่าาาาาาาาาาาาาาาาาาาาาาาาาาาาาาาาาาาา
//
//         point = parseInt(point)
//         let data = {
//             "name": name,
//             "uid": uid,
//             "point":  point,
//             "year": year
//         }
//         const userRef = await firestore.collection("users").add(data);
//         res.status(200).send('Ok');
//     } catch (err) {
//         res.status(500).send('Not ok');
//     }
// })

module.exports = ldrBoardController;
