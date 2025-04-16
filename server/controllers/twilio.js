/** @type {import("express").RequestHandler} */
require('dotenv').config({
  path: '../.env'
});
const MessagingResponse = require('twilio').twiml.MessagingResponse;
const accountSid = process.env.TWILIO_S_ID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);
const firebaseController = require('./firebase_users.js');
const axios = require('axios');
const utils = require('../utils/getSongUri.js');
const request = require('request');

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
/** @type {import("express").RequestHandler} */

  sendWelcomeMessage: (req, res, next) => {
    const phone = req.body
    client.messages.create({
      body: `Yo! You just set up your account. Save this number - send a song you've been loving to your friends. Just copy a link from spotify and tell us who to send it to. Reply with a HELL YES to get started.`,
      from: `+${process.env.REACT_APP_TWILIO_PHONE_NUMBER}`,
      to: `+18777804236` // this needs to change to `+1${req.body.phone}` when deployed and phone registered
    }).then(() => {
      res.send([200]);
    }).catch((err)=> console.error(err));
  },
  alertSuccess: (req, res, next) => {
    console.log(req.body.phone, req.body.From)
    const userToSearch = req.userToSearch;
    
  },
/** @type {import("express").RequestHandler} */

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
      req.userToSearch = userSearch;

      const response = await axios.post(`https://api.spotify.com/v1/playlists/${userSearch.playlistId}/tracks`, {
        uris: [
          ...song
        ]
      }, {
        headers: {
          "Authorization": "Bearer " + userSearch.accessToken
        }
      }).then(() => {
        client.messages.create({
          body: `Hey, someone added a song to your playlist! Check it out: https://open.spotify.com/playlist/${userSearch.playlistId}`,
          from: `+${process.env.REACT_APP_TWILIO_PHONE_NUMBER}`,
          to: `+18777804236` // this needs to change to `${userToSearch.phone}` when deployed and phone registered
        }).then(() => {
          client.messages.create({
            body: `Alright, we let ${userSearch.displayName} know you added a song to their suggestify playlist`,
            from: `+${process.env.REACT_APP_TWILIO_PHONE_NUMBER}`,
            to: `+18777804236` // this needs to change to `+1${req.body.phone}` when deployed and phone registered
          }).then(() => {
            res.send([200]);
            return;
          });
        })
        console.log('okay');
      }).catch((err) => {
        if (err.response.data.error.message.toLowerCase().includes(('expired'))) {
          next();
          res.status(303);
          return;
        } 
      });
    }
  }
}