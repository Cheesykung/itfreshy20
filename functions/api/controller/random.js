const cors = require('cors');
const express = require('express');
const admin = require('../config/admin');
const firestore = admin.firestore();


const randomController = express();

randomController.use(cors({
    origin: true
}));
randomController.get('/random', async (req, res) => {
    // try {
    //const userRef = await firestore.collection("user");
    const secretRef = await firestore.collection('backupSFUser');
    const snapShot = await secretRef.orderBy('point', 'desc').get()
    const userRef = await firestore.collection("users");


    let arrayY2 = ["62070007", "62070080", "62070140", "62070149", "62070234", "62070237", "62070264", "62070272", "62070262"]; //array ของพี่ที่โดนสุ่มแล้ว
    let arrayR2T = [] // เก็บ คนที่สุ่ม 2 ครั้ง
    let userFail = [];

    let data = {
        // player ของรุ่นพี่
        "player": ["60070153", "61070163", "61070287", "62070001", "62070002", "62070003", "62070004", "62070005", "62070006", "62070008", "62070010", "62070011", "62070012", "62070013", "62070014", "62070015", "62070018", "62070019", "62070021", "62070023", "62070026", "62070027", "62070029", "62070030", "62070031", "62070032", "62070033", "62070035", "62070036", "62070037", "62070039", "62070040", "62070041", "62070043", "62070044", "62070045", "62070046", "62070047", "62070048", "62070049", "62070050", "62070051", "62070054", "62070055", "62070056", "62070057", "62070059", "62070060", "62070061", "62070062", "62070063", "62070065", "62070066", "62070067", "62070069", "62070071", "62070072", "62070073", "62070074", "62070077", "62070081", "62070082", "62070084", "62070085", "62070086", "62070087", "62070088", "62070089", "62070090", "62070092", "62070093", "62070095", "62070096", "62070098", "62070099", "62070101", "62070102", "62070103", "62070105", "62070106", "62070107", "62070108", "62070110", "62070111", "62070113", "62070114", "62070115", "62070116", "62070118", "62070119", "62070120", "62070121", "62070122", "62070123", "62070124", "62070125", "62070126", "62070127", "62070128", "62070130", "62070131", "62070132", "62070133", "62070134", "62070135", "62070136", "62070137", "62070138", "62070139", "62070141", "62070144", "62070145", "62070146", "62070147", "62070148", "62070150", "62070151", "62070152", "62070153", "62070154", "62070155", "62070156", "62070157", "62070158", "62070159", "62070160", "62070165", "62070166", "62070169", "62070170", "62070171", "62070173", "62070174", "62070175", "62070177", "62070178", "62070179", "62070180", "62070181", "62070182", "62070184", "62070185", "62070187", "62070188", "62070189", "62070190", "62070191", "62070192", "62070193", "62070195", "62070196", "62070197", "62070198", "62070200", "62070202", "62070203", "62070204", "62070205", "62070206", "62070207", "62070208", "62070210", "62070211", "62070212", "62070214", "62070216", "62070217", "62070218", "62070219", "62070220", "62070222", "62070223", "62070224", "62070226", "62070229", "62070230", "62070231", "62070232", "62070236", "62070238", "62070240", "62070241", "62070244", "62070245", "62070247", "62070248", "62070249", "62070251", "62070252", "62070253", "62070255", "62070256", "62070257", "62070258", "62070259", "62070260", "62070263", "62070265", "62070266", "62070267", "62070270", "62070271", "62070273", "62070274", "62070275", "62070276", "62070277", "62070280", "62070281", "62070282", "62070283", "62070284", "62070286", "62070288", "62070291", "62070292", "62070297"], //not year 1
        "random2Times": ["60070153", "62070005", "62070041", "62070057", "62070065", "62070066", "62070086", "62070102", "62070108", "62070137"], //มีนสิทธ์ได้น้องสองคน
        "randomSuccessY1": [],
        "randomSuccessY2": [],
        "randomFailY1": [],
        "blank": [], // คนที่ไม่ได้สแกนรุ่นพี่เลย,
    }

    //เพิ่ม point ลงใน secretfromuser
    // let orderList = await userRef.orderBy('point', 'desc').get();
    // await orderList.forEach(doc => {
    //     if (parseInt(doc.data().year) == 1 && doc.data().id[1] === "3") {
    //         let userID = doc.data().id;
    //         let userUID = doc.data().uid;
    //         let userPoint = parseInt(doc.data().point);
    //         secretRef.doc(userID).update({
    //             "point": userPoint
    //         })
    //     }
    // })

    //Step1
    await snapShot.forEach(doc => {
        if (doc.data().uid != "") {
            if (doc.data().score[0]) {
                let userID = doc.id;
                let dataScore = doc.data().score;

                // sort จัดอันดับพี่ที่แสกน
                let sortData = dataScore.sort((a, b) => {
                    return (a.point > b.point) ? -1 : 1;
                });

                //นำ sortData มาทำ arraySort โดยมีแค่ ID นักศึกษา
                let arraySort = [];
                sortData.find(doc => {
                    arraySort.push(doc.uid);
                })


                // ตัดรายชื่อพี่ที่โดนสุ่มไปแล้ว
                sortData.forEach(doc => {
                    for (let i = 0; i < arrayY2.length; i++) {
                        if (arrayY2[i] == doc.uid) {
                            let index = arraySort.indexOf(doc.uid);
                            if (index > -1) {
                                arraySort.splice(index, 1);
                            }
                        }
                    }
                });

                // เรียกพี่ที่มีแต้มสูงสุดออกมา
                let arrayTop = [] //เก็บใน array
                if (arraySort.length != 0) {
                    let indexMax = sortData.findIndex(x => x.uid === arraySort[0]);
                    let max = sortData[indexMax].point;
                    sortData.find(obj => {
                        if (obj.point == max) {
                            arrayTop.push(obj.uid)
                        }
                    })
                }

                //random
                if (arrayTop.length > 0) {
                    const random = Math.floor(Math.random() * arrayTop.length);
                    arrayY2.push(arrayTop[random]);
                    data.randomSuccessY1.push({
                        "family": arrayTop[random],
                        "user": userID
                    });
                    data.randomSuccessY2.push({
                        "family": userID,
                        "userY2": arrayTop[random]
                    });
                    // ลบคนที่โดนสุ่มแล้วออกจาก data player
                    if (data.player.includes(arrayTop[random])) {
                        let index = data.player.indexOf(arrayTop[random]);
                        if (index > -1) {
                            data.player.splice(index, 1);
                        }
                    }

                } else {
                    data.randomFailY1.push(userID);
                    userFail.push(userID);
                }

            } else {
                data.randomFailY1.push(doc.id)
                userFail.push(doc.id);
            }
        } else {
            data.blank.push(doc.id);
        }
    })

    //Step2  //จับคู่ของ random fail

    let copyUserFail = [...userFail]
    await copyUserFail.forEach(userID => {

        if (data.player.length > 0) {

            let isRandom = randomT(data.player, arrayY2);
            arrayY2.push(isRandom);
            data.randomSuccessY1.push({
                "family": isRandom,
                "user": userID
            })
            data.randomSuccessY2.push({
                "family": userID,
                "userY2": isRandom
            });
            let indexPlayer = data.player.indexOf(isRandom);
            let indexFail = userFail.indexOf(userID);
            if (indexPlayer > -1) {
                data.player.splice(indexPlayer, 1);
            }
            if (indexFail > -1) {
                userFail.splice(indexFail, 1);
            }
            // console.log({
            //     "lenArrayY2": arrayY2.length,
            //     "lenPlayer": data.player.length,
            //     "success": data.randomSuccessY1.length,
            // });
        }
    })

    //step 3 น้องคนที่เหลือมาสุ่มกับพี่รหัสที่รับสองคน

    if (userFail.length > 0) {
        copyUserFail = [...userFail]
        await copyUserFail.forEach(userID => {
            let isRandom = randomT(data.random2Times, arrayR2T)
            arrayR2T.push(isRandom)
            data.randomSuccessY1.push({
                "family": isRandom,
                "user": userID
            })
            data.randomSuccessY2.push({
                "family": userID,
                "userY2": isRandom
            });
            let indexPlayer = data.random2Times.indexOf(isRandom);
            let indexFail = userFail.indexOf(userID);
            if (indexPlayer > -1) {
                data.random2Times.splice(indexPlayer, 1);
            }
            if (indexFail > -1) {
                userFail.splice(indexFail, 1);
            }
        })
    }

    await data.randomSuccessY1.forEach(async user => {
        const FieldValue = admin.firestore.FieldValue;
        let userUID;
        let payload = {
            "familyId": "",
            "familyFB": "",
            "familyFname": "",
            "familySurname": "",
            "familyUID": "",
            "fb": "",
            "fname": "",
            "surname": ""
        }
        await secretRef.doc(user.user).get().then(doc => {
            userUID = doc.data().uid;
        })
        let userFamily = await userRef.where("id", "==", user.family).get();
        userFamily.forEach(doc => {
            payload = {
                "familyId": user.family,
                "familyFB": doc.data().name,
                "familyFname": doc.data().fname,
                "familySurname": doc.data().surname,
                "familyUID": doc.id,
            }
        })
        await userRef.doc(userUID).get().then(doc => {
            payload.fb = doc.data().name;
            payload.fname = doc.data().fname;
            payload.surname = doc.data().surname;
        })
        secretRef.doc(user.user).update(payload);
    })


    console.log({
        "success": data.randomSuccessY1.length,
        "fail": userFail.length,
        "random2Times": arrayR2T,
        "blank": data.blank.length,
        "player": data.player.length,
        "userFail": userFail,
    })

    res.send(data)

    // } catch (e) {
    //     res.status(500).send('nooooooooooo');
    // }
})

// randomController.get('/backupSFUser', async (req, res) => {
//     try {
//         const  role = req.body.role
//         const sfUser = await firestore.collection("backupSFUser");
//         const secretUser = await firestore.collection("secretfromuser").get();
//         if (role == "King") {
//             await secretUser.forEach(doc => {
//                 sfUser.doc(doc.id).set(doc.data())
//
//             })
//         }
//         res.send({
//             "status": "ok"
//         })
//     }
//     catch (err) {
//         res.status(500).send({
//             "err": err
//         })
//     }
// })

// randomController.get('/backupSecret', async (req, res) => {
//     let secretRef = firestore.collection('secretfromuser').get();
//     let scretBack = firestore.collection('backupSFUser');
//     (await secretRef).forEach(doc => {
//         console.log(doc.id)
//         let backDoc = scretBack.doc(doc.id);
//         backDoc.update(doc.data())
//         console.log(doc.data())
//     })
// })

function randomT(array, arrayY2) {
    let key = true;
    while (key == true) {
        const random = Math.floor(Math.random() * array.length);
        if (arrayY2.includes(array[random])) {
            key = true;
        } else {
            return array[random]
        }
    }

}

module.exports = randomController;