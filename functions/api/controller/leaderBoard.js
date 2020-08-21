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
        const {uid, year} = req.body;
        const ranksRef = await firestore.collection('ranks');
        const userRef = await firestore.collection("users");
        //const snapshot = await userRef.where("point", ">=", 0).orderBy('point', 'desc').get();
        let snapshot = await userRef.orderBy('point', 'desc').get();
        let arrayScore = []; // เก็บใน array เพื่อจัดลำดับ
        let isRanks = year == '1' ? "year1Ranking" : "year2Ranking";

        await snapshot.forEach(doc => {
            let isYear = doc.data().year;
            if (isYear === year){
                let isPoint = doc.data().point ? doc.data().point : null;
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
            let data = {
                'rank1': doc.data().ranking[0].name ? doc.data().ranking[0].name : null,
                'rank2': doc.data().ranking[1].name ? doc.data().ranking[1].name : null,
                'rank3': doc.data().ranking[2].name ? doc.data().ranking[2].name : null,
                'rank4': doc.data().ranking[3].name ? doc.data().ranking[3].name : null,
                'rank5': doc.data().ranking[4].name ? doc.data().ranking[4].name : null,
                'rank6': doc.data().ranking[5].name ? doc.data().ranking[5].name : null,
                'rank7': doc.data().ranking[6].name ? doc.data().ranking[6].name : null,
                'rank8': doc.data().ranking[7].name ? doc.data().ranking[7].name : null,
                'rank9': doc.data().ranking[8].name ? doc.data().ranking[8].name : null,
                'rank10': doc.data().ranking[9].name ? doc.data().ranking[9].name : null,
                'rankMe': {
                    'name':doc.data().ranking[index].name ? doc.data().ranking[index].name : null,
                    'rank': index+1}
            }
            console.log("rank: "+(index+1))
            res.status(200).send({
                'statusCode': '200',
                'statusText': 'Request Success',
                'error': false,
                'message': 'Respond successfully',
                'data': data
            });
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

module.exports = ldrBoardController;
