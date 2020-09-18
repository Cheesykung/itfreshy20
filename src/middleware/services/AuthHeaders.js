import firebase from "firebase/app";
import "firebase/auth";

const config = require("../config/config.json");

firebase.initializeApp(config);

export default firebase;
