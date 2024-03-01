/** @type {import("express").RequestHandler} */
const path = require('path')
require('dotenv').config({path: path.resolve(__dirname, `../.env`)});

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const twilioRouter = require('./routes/twilio');
const spotifyRouter = require('./routes/spotify');
const cookieParser = require('cookie-parser');
const port = process.env.PORT || 3001;

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
app.use('', spotifyRouter); 
app.use('', twilioRouter);  


// endpoints for interacting with spotify api using text message


// needed functions
// need to receive a name or account id
// find the profile of the user who sent it
// check if that user is followed by the user he is trying to send to
// look up song in catalog - get id
// add song by id to playlist titled "suggestify"


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