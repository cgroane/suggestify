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
      body: `Yo! You just set up your account. Save this number - send a song you've been loving to your friends. Just copy a link from spotify and tell us who to send it to.`,
      from: '+18333441764',
      to: `+18777804236` // this needs to change to `+1${req.body.phone}` when deployed and phone registered
    }).then(message => console.log(message.sid)).catch((err)=> console.error(err));
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
  receiveTextToCreatePlaylist: (req, res, next) => {
    const twiml = new MessagingResponse();
    let messageBody = req.body.Body;

    next()
  }
}