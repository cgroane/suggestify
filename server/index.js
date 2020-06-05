

require('dotenv').config({path: "/Users/connor.roane/Documents/Projects/suggestify/.env"});
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const MessagingResponse = require('twilio').twiml.MessagingResponse;
const twilioController = require('./controllers/twilio');

const port = 3001;

const app = express();

const accountSid = process.env.TWILIO_S_ID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(cors());

// endpoints for interacting with spotify api using text messages
app.post('/sms', twilioController.receiveSongSuggestion);
app.post('/new-account', twilioController.sendWelcomeMessage)


// needed functions
// need to receive a name or account id
// find the profile of the user who sent it
// check if that user is followed by the user he is trying to send to
// look up song in catalog - get id
// add song by id to playlist titled "suggestify"

const path = require('path');
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/../build/index.html'));
});




app.listen(port, () => {
  console.log(`Listening on port: ${port}`);
});