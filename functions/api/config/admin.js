const admin = require("firebase-admin");
const serviceAccount = require("./serviceAccount");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://itfreshy2020.firebaseio.com"
});

module.exports = admin;