const path = require('path')
require('dotenv').config({path: path.resolve(__dirname, `../.env`)});

console.log(process.env.ENVIRONMENT_VAR);
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const twilioController = require('./controllers/twilio');
const spotifyController = require('./controllers/spotify');
const cookieParser = require('cookie-parser');
const port = 3001;

const app = express();

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cookieParser());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});


// endpoints for interacting with spotify api using text messages
app.post('/api/sms', twilioController.receiveTextToAddToPlaylist);
app.post('/api/new-account', twilioController.sendWelcomeMessage)


// needed functions
// need to receive a name or account id
// find the profile of the user who sent it
// check if that user is followed by the user he is trying to send to
// look up song in catalog - get id
// add song by id to playlist titled "suggestify"

app.get('/api/spotify-login', spotifyController.spotifyAuth)
app.get('/api/refresh_token', spotifyController.getRefreshToken);
app.get('/api/callback', spotifyController.getCallback);
app.post('/api/sms/:user_id', spotifyController.createPlaylist);

let root = path.join(__dirname, '..', 'build/')
app.use(express.static(root))
app.use(function(req, res, next) {
  if (req.method === 'GET' && req.accepts('html') && !req.is('json') && !req.path.includes('.')) {
    res.sendFile('index.html', { root })
  } else next()
}).use(cors())


app.listen(port, () => {
  console.log(`Listening on port: ${port}`);
});