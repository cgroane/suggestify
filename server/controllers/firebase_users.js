const admin = require("firebase-admin");

const firebaseConfig = {
  apiKey: "AIzaSyCXUsaJR7pwtq5tId-ykf-2B9-Y1jRqBRg",
  authDomain: "bangas-united.firebaseapp.com",
  databaseURL: "https://bangas-united.firebaseio.com",
  projectId: "bangas-united",
  storageBucket: "bangas-united.appspot.com",
  messagingSenderId: "58611865268",
  appId: "1:58611865268:web:f76f3f543c86bc543329e1",
  measurementId: "G-H5Z8PL4XB3"
};
let firebaseConnect = admin.initializeApp(firebaseConfig);

module.exports = {
  lookupUser: (email) => firebaseConnect.auth().getUserByEmail(email).then(user => user).catch((err) => err),
  lookupUserProfile: (id) => {
    // console.log(id)
    let dbConnect = firebaseConnect.database()
    let ref = dbConnect.ref('users')
    ref.orderByChild(id).once('value').then((response) => {
      if(!response.numChildren()) {
        throw new Error('No results')
      }
      let snapshot;
      response.forEach((user) => {
        // console.log(user.val())
        snapshot = user.val()
      })
      return snapshot;
    }).catch((err) => console.log(err))
  }
}