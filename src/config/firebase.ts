import firebase from 'firebase'
require('dotenv').config({path: "/Users/connor.roane/Documents/Projects/suggestify/.env"});
console.log(process.env.FIREBASE_API_KEY)

let config = {
  apiKey: "AIzaSyCXUsaJR7pwtq5tId-ykf-2B9-Y1jRqBRg",
  authDomain: "bangas-united.firebaseapp.com",
  databaseURL: "https://bangas-united.firebaseio.com",
  projectId: "bangas-united",
  storageBucket: "bangas-united.appspot.com",
  messagingSenderId: "58611865268",
  appId: "1:58611865268:web:f76f3f543c86bc543329e1",
  measurementId: "G-H5Z8PL4XB3"
};
firebase.initializeApp(config);

// Get a reference to the database service
let fb = firebase;

export default fb;