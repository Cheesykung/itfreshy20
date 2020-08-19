
/*
testController.get('/shiba', async (req, res) => {
    try {
        res.status(200).send({
            'statusCode': '200',
            'statusText': 'Success',
            'error': false
        });
    } catch (e) {
        console.log(e);
        res.status(500).send({
            'statusCode': '500',
            'statusText': 'Internal Server Error',
            'error': true
        });
        return;
    }
});

testController.post('/cybireans', async (req, res) => {
    try {
        let { name, lname } = req.body;
        console.log(name, lname);

        let year1 = {
            "namekey": name,
            "surnamekey": lname,
            "years": 1
        };

        let userRef = firestore.collection("USERs").doc(name);
        await userRef.set(year1);
        res.send(200);

    } catch (e) {
        console.log(e);
        res.status(500).send({
            'statusCode': '500',
            'statusText': 'Internal Server Error',
            'error': true
        });
        return;
    }
});

testController.get('/iam/:name', async (req, res) => {
    try {
        let name = req.params.name;
        let userRef = firestore.collection("USERs").doc(name);
        let userDoc = await userRef.get();
        if (userDoc.exists) {
            let user = userDoc.data();
            res.status(200).send({
                'statusCode': '200',
                'statusText': 'COMPLETE, OK',
                'error': false,
                'data': user
            });
        }
        else {
            res.status(404).send({
                'statusCode': '404',
                'statusText': 'NOT FOUND',
                'error': true
            })
        };
        return;
    } catch (e) {
        console.log(e);
        res.status(500).send({
            'statusCode': '500',
            'statusText': 'Internal Server Error',
            'error': true
        });
        return;
    }
})
*/


// testController.get("/account", isLoggedIn, function (req, res) {
//     try {
//         console.log("----------->account");
//         console.log(req.user);
//     } catch (err) {
//         res.status(500).send({
//             statusCode: '500',
//             statusText: 'Internal Server Error',
//             error: true,
//             message: 'Internal Server Error'
//         });
//     }
// });

testController.get("/control", isLoggedIn, function (req, res) {
    try {
        console.log(req.user.role);
    } catch (err) {
        res.status(500).send({
            statusCode: '500',
            statusText: 'Internal Server Error',
            error: true,
            message: 'Internal Server Error'
        });
    }
});