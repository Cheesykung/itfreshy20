import * as firebase from "firebase";
const config = require("../config/config.json");

firebase.initializeApp(config);

export default firebase;
