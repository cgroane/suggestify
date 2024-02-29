require('dotenv').config({
  path: '../.env'
});
const MessagingResponse = require('twilio').twiml.MessagingResponse;
const bodyParser = require("body-parser");
const accountSid = process.env.TWILIO_S_ID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);
const firebaseController = require('./firebase_users.js');
const spotifyController = require('./spotify.js');
const axios = require('axios');
const utils = require('../utils/getSongUri.js');

const badMessageReply = () => {
  const twiml = new MessagingResponse()
  twiml.message('Messages must follow the following format: email address spotify link');

  res.writeHead(200, {'Content-Type': 'text/xml'});
  res.end(twiml.toString());
}

/**
 * as of jan 2024, sms phone numbers must be verified and therefore, we cannot send messages to actual phones yet.
 * 
 */
module.exports = {
  sendWelcomeMessage: (req, res, next) => {
    const phone = req.body
    client.messages.create({
      body: `Yo! You just set up your account. Save this number - send a song you've been loving to your friends. Just copy a link from spotify and tell us who to send it to. Reply with a HELL YES to get started.`,
      from: '+18333441764',
      to: `+18777804236` // this needs to change to `+1${req.body.phone}` when deployed and phone registered
    }).then(message => {
      res.send([200]);
    }).catch((err)=> console.error(err));
  },
  optIn: (req, res, next) => {
    let messageBody = req.body.Body;
    if (messageBody.toUpperCase().contains('HELL YES')) {
      const twiml = new MessagingResponse();
    }

  },
  receiveSongSuggestion: (req, res, next) => {
    // receive message with name and song
    const twiml = new MessagingResponse();
    let messageBody = req.body.Body;
    // messageBody = messageBody.split(' ')

    // if (messageBody[0].contains('@')) {
      const user = firebaseController.lookupUser(messageBody).then((response) => firebaseController.lookupUserProfile(response.uid))
    // } else {
    //   res.status(400).send()
    // }
    twiml.message('The Robots are coming! Head for the hills!');

    res.writeHead(200, {'Content-Type': 'text/xml'});
    res.end(twiml.toString());
  },
  receiveTextToAddToPlaylist: async (req, res, next) => {
    const twiml = new MessagingResponse();
    let messageBody = req.body.Body;
    
    if (messageBody.includes('user=')) {
      const message = messageBody.split('&');
      const userQuery = message[message.length - 1];
      const userToSearch = userQuery.substring(userQuery.indexOf('=') + 1);
      const suggestedSong = message[0];
      const userSearch = await firebaseController.lookupUserProfile(userToSearch);
      const song = utils.getSongUri(suggestedSong);
      axios.post(`https://api.spotify.com/v1/playlists/${userSearch.playlistId}/tracks`, {
        uris: [
          ...song
        ]
      }, {
        headers: {
          "Authorization": "Bearer " + userSearch.accessToken
        }
      }).then(() => console.log('okay')).catch((err) => {
        if (err.status === 401) {
          console.log('401')
        }
      });
    }
  }
}