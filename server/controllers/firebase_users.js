require('dotenv').config({path: "/Users/connor.roane/Documents/Projects/suggestify/.env"});

var admin = require("firebase-admin");

var serviceAccount = require("../bangas-united-firebase-adminsdk-7mg4j-9c6af9a521.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: `https://${process.env.REACT_APP_PROJECT_ID}.firebaseio.com`
});

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