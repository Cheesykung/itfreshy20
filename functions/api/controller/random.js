const cors = require('cors');
const express = require('express');
const admin = require('../config/admin');
const firestore = admin.firestore();

const randomController = express();

randomController.use(cors({ origin: true }));
randomController.get('/random', async (req, res) => {
    try {
        const secretRef = firestore.collection('testRandom');
        const snapShot = await secretRef.get();
        let arrayY2 = [];
        let randomSuccess = [];
        let arrayY1Failed = []; //น้องไม่มีพี่ โดนคนกอ่นหนน้าแย่งงงงงงงงงง
        await snapShot.forEach(doc => {

            if (doc.data().scoreMe[0]) { //เช็คน้องที่ไม่เล่นอะไรเลย
                let data = doc.data().scoreMe;
                // sort จัดอันดับพี่ที่แสกน
                let sortData = data.sort((a, b) => {
                    return (a.point > b.point) ? -1 : 1;
                });
                console.log(sortData)

                // นำ sortData มาทำ arraySort
                let arraySort = [];
                sortData.find(doc => {
                    arraySort.push(doc.uid);
                })

                //console.log(arraySort)
                // ตัดรายชื่อพี่ที่โดนสุ่มไปแล้ว
                sortData.forEach(doc => {
                    for (let i=0; i< arrayY2.length; i++) {
                        if (arrayY2[i] == doc.uid) {
                            let index = arraySort.indexOf(doc.uid);
                            if (index > -1) {
                                arraySort.splice(index, 1);
                            }
                            //arrayRandom.push(doc);
                        }
                    }
                    //console.log(doc)
                });
                console.log('new--->'+arraySort);

                // เรียกพี่ที่มีแต้มสูงสุดออกมา
                console.log(sortData.findIndex(x => x.uid === arraySort[0]))
                let arrayTop = [] //เก็บใน array
                if (arraySort.length == 0) {
                    console.log('not passssss')
                } else {
                    let indexMax = sortData.findIndex(x => x.uid === arraySort[0]);
                    let max = sortData[indexMax].point;
                    sortData.find(obj => {
                        if (obj.point == max) {
                            arrayTop.push(obj.uid)
                        }
                    })

                }

                console.log('arrayData-->'+arrayTop)

                // let arrayRandom = ['uid20'];
                // let test = sortData - arrayRandom;
                // console.log('testttt-->'+test)
                // ตัดรายชื่อพี่ที่โดนสุ่มไปแล้ว
                // arrayData.forEach(doc => {
                //     for (let i=0; i< arrayY2.length; i++) {
                //         if (arrayY2[i] == doc) {
                //             let index = arrayData.indexOf(doc);
                //             if (index > -1) {
                //                 arrayData.splice(index, 1);
                //             }
                //             //arrayRandom.push(doc);
                //         }
                //     }
                //     //console.log(doc)
                // });
                // console.log('new--->'+arrayData);

                // if (arrayData.length == 0) {
                //
                // }

                //random
                //console.log('arrayRandom-->'+arrayRandom);
                if (arrayTop.length > 0) {
                    const random = Math.floor(Math.random() * arrayTop.length);
                    arrayY2.push(arrayTop[random]);
                    randomSuccess.push({
                        'uid': doc.id,
                        'family': arrayTop[random]
                    })
                    console.log(doc.id+'---->'+ arrayTop[random])
                } else {
                    arrayY1Failed.push(doc.id);
                    console.log('mai me peeee-->'+arrayY1Failed)
                }
                console.log("arraY2 Jaaaaa-->"+arrayY2);
                console.log('-------------------------------------')
            } else {
                console.log('not pass'+ doc.id)
            }
        });



        //find someone year2 has not been random
        const year2Ref = await firestore.collection('ranks').doc('year2Ranking');
        let arrayY2Failed = [];

        await year2Ref.get().then(doc => {
            let rankingData = doc.data().ranking;
            rankingData.find(item => {
                arrayY2Failed.push(item.uid)
            });
            rankingData.forEach(doc => {
                for (let i=0; i< arrayY2.length; i++) {
                    if (arrayY2[i] == doc.uid) {
                        let index = arrayY2Failed.indexOf(doc.uid);
                        if (index > -1) {
                            arrayY2Failed.splice(index, 1);
                        }
                    }
                }
            });
            console.log('last-->'+arrayY2Failed);
            if (arrayY1Failed.length <= arrayY2Failed.length) {
                arrayY1Failed.forEach(year1 => {
                    const random = Math.floor(Math.random() * arrayY2Failed.length);
                    arrayY2.push(arrayY2Failed[random]);
                    randomSuccess.push({
                        'uid': year1,
                        'family': arrayY2Failed[random]
                    });

                    rankingData.forEach(doc => {
                        for (let i=0; i< arrayY2.length; i++) {
                            if (arrayY2[i] == doc.uid) {
                                let index = arrayY2Failed.indexOf(doc.uid);
                                if (index > -1) {
                                    arrayY2Failed.splice(index, 1);
                                }
                            }
                        }
                    });
                    console.log('---->'+arrayY2Failed);
                });
            }
        })

        res.status(200).send({
            'statusCode': 200,
            'randomSuccessY1': randomSuccess,
            'randomSuccessY2': arrayY2,
            'randomFailedY1': arrayY1Failed,
            'randomFailedY2': arrayY2Failed,
        });
    } catch (e) {
        res.status(500).send('nooooooooooo');
    }
})

module.exports = randomController;
