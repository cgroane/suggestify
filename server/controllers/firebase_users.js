const admin = require("firebase-admin");

let firebaseConnect = admin.initializeApp({
  credential: admin.credential.cert('/Users/connor.roane/Documents/practice/suggestify/bangas-united-firebase-admin.json'),
  databaseURL: "https://bangas-united.firebaseio.com"
});

module.exports = {
  lookupUser: (email) => firebaseConnect.auth().getUserByEmail(email).then(user => user).catch((err) => err),
  lookupUserProfile: (id) => {
    console.log(id)
    let dbConnect = firebaseConnect.database()
    let ref = dbConnect.ref('users')
    ref.orderByChild(id).once('value').then((response) => {
      if(!response.numChildren()) {
        throw new Error('No results')
      }
      let snapshot;
      response.forEach((user) => {
        console.log(user.val())
        snapshot = user.val()
      })
      return snapshot;
    }).catch((err) => console.log(err))
  }
}