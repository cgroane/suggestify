const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');

require('dotenv').config({path: "/Users/connor.roane/Documents/Projects/suggestify/.env"});
// const saCert = JSON.parse(process.env.FIREBASE_SA_CERT);
const saCert = require('../../bangas-united-firebase-adminsdk-7mg4j-c54fe4238e.json');

initializeApp({
  credential: cert(saCert),
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
  },
  /** @type {import("express").RequestHandler} */
  updateUser: async (req, res) => {
    const id = req.userToSearch.spotifyId;
    const userRef = db.collection('users').doc(id);
    const snapshot = await userRef.get();
    if (snapshot.empty) {
      console.log(`can't find that user`);
      res.status(404).statusMessage('Could not locate that user');
      throw new Error(`User does not exist`);
    } else {
      const response = await userRef.update({...req.userToSearch});
      res.redirect('/api/sms');
      return response;
    }
  }
}