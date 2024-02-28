const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');

require('dotenv').config({path: "/Users/connor.roane/Documents/Projects/suggestify/.env"});

var serviceAccount = require("../bangas-united-firebase-adminsdk-7mg4j-9c6af9a521.json");

initializeApp({
  credential: cert(serviceAccount),
  databaseURL: `https://${process.env.REACT_APP_PROJECT_ID}.firebaseio.com`
});

const db = getFirestore();

module.exports = {
  lookupUser: async (key, value) => {
    const usersRef = db.collection('users');
    const queryRef = usersRef.where(key, '==', value);
    const snapshot = await queryRef.get();
    if (snapshot.empty) {
      return false;
    } else {
      let results = [];

      snapshot.forEach((doc) => results.push(doc.data()));
      return { userId: results[0].spotifyId, accessToken: results[0].accessToken };
    }
  },
  lookupUserProfile: async (id) => {
    const docRef = db.collection('users').doc(id);
    const userDoc = await docRef.get();
    if (!userDoc.exists) {
      /**
       * TODO - Create twilio text handler to alert texter with a reply that the user was not found
       */
      console.log(`doesn't exist`);
      return;
    }
    return userDoc.data();
  },
  getUsers: async () => {
    const usersRef = db.collection('users');
    const snapshot = await usersRef.get();
    if (snapshot.empty) {
      console.log('no users')
      return;
    }
    return [...snapshot.forEach((doc) => doc.data())];
  }
}