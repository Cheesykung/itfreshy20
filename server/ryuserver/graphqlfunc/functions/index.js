const firebase = require('firebase')
const functions = require('firebase-functions');
const admin = require('firebase-admin');
const express = require('express')
const { ApolloServer, gql } = require('apollo-server-express')
const serviceAccount = require("./testfirebase-b1b40-firebase-adminsdk-bmvz2-4a835a7986.json")
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://testfirebase-b1b40.firebaseio.com"
});
const config = {
    apiKey: "AIzaSyCzBMDRpwd-xp0xwAXo1fSSueCgR92kdQY",
    authDomain: "testfirebase-b1b40.firebaseapp.com",
    databaseURL: "https://testfirebase-b1b40.firebaseio.com",
    projectId: "testfirebase-b1b40",
    storageBucket: "testfirebase-b1b40.appspot.com",
    messagingSenderId: "654929409868",
    appId: "1:654929409868:web:cab8064977c492a09041e9",
    measurementId: "G-KENYTC4VLE"
}

firebase.initializeApp(config)
const db = admin.firestore();
var arr = []
async function getAll(db) {
    arr = []
    // [START get_all]
    const citiesRef = db.collection('user');
    const snapshot = await citiesRef.get();
    return await snapshot.forEach(doc => {
      arr.push(doc.data());
    });
    // [END get_all]
  }
const typeDefs = gql`
    type Users{
        NAME: String
        UID: String
    }
    type Query{
        user: [Users]
    }
    `
const resolvers = {
    Query: {
        user: async () => {
            await getAll(db)
            return arr
            // [
            //             { NAME: 'ee5ae76d-9b91-4270-a007-fad2054e2e75', UID: 'lorem ipsum' },
            //             { NAME: 'ca5c182b-99a8-4391-b4b4-4a20bd7cb13a', UID: 'quis ut' }
            //         ]
            // return admin
            //     .database()
            //     .ref("user")
            //     .once("value")
            //     .then((snap) => snap.val())
            //     .then((val) => Object.keys(val).map((key) => val[key]))
        },
    },
};

const app = express()
const server = new ApolloServer({ typeDefs, resolvers })
server.applyMiddleware({ app, path: "/", cors: true })

exports.graphql = functions.https.onRequest(app)

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
