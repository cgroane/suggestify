const querystring = require('querystring');
const request = require('request');
const axios = require('axios');
require('dotenv').config({path: "/Users/connor.roane/Documents/Projects/suggestify/.env"});

const redirect_uri = "http://localhost:3001/callback/"
let generateRandomString = function(length) {
  var text = '';
  var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};
const stateKey = 'spotify_auth_state';

module.exports = {
  spotifyAuth: (req, res, next) => {
    console.log('spotify login')
    var state = generateRandomString(16);
    res.cookie(stateKey, state);

    let scope = 'playlist-modify-public user-follow-read'
    res.redirect('https://accounts.spotify.com/authorize?' +
    querystring.stringify({
      response_type: 'code',
      client_id: process.env.SPOTIFY_CLIENT_ID,
      scope: scope,
      redirect_uri: process.env.SPOTIFY_REDIRECT_URI,
      state: state
    }))
  },
  getCallback: (req, res) => {

    // your application requests refresh and access tokens
    // after checking the state parameter
  
    var code = req.query.code || null;
    var state = req.query.state || null;
    var storedState = req.cookies ? req.cookies[stateKey] : null;
  
    if (state === null || state !== storedState) {
      res.redirect('/#' +
        querystring.stringify({
          error: 'state_mismatch'
        }));
    } else {
      res.clearCookie(stateKey);
      var authOptions = {
        url: 'https://accounts.spotify.com/api/token',
        form: {
          code: code,
          redirect_uri: process.env.SPOTIFY_REDIRECT_URI,
          grant_type: 'authorization_code'
        },
        headers: {
          'Authorization': 'Basic ' + (new Buffer(process.env.SPOTIFY_CLIENT_ID + ':' + process.env.SPOTIFY_CLIENT_SECRET).toString('base64'))
        },
        json: true
      };
  
      request.post(authOptions, function(error, response, body) {
        if (!error && response.statusCode === 200) {
  
          var access_token = body.access_token,
              refresh_token = body.refresh_token;
  
          var options = {
            url: 'https://api.spotify.com/v1/me',
            headers: { 'Authorization': 'Bearer ' + access_token },
            json: true
          };
  
          // use the access token to access the Spotify Web API
          request.get(options, function(error, response, body) {
            // console.log(body);
          });
  
          // we can also pass the token to the browser to make requests from there
          res.redirect('/refresh_token' +
            querystring.stringify({
              access_token: access_token,
              refresh_token: refresh_token
            }));
        } else {
          res.redirect('/#' +
            querystring.stringify({
              error: 'invalid_token'
            }));
        }
      });
    }
  },
  
  getRefreshToken: (req, res) => {
    // requesting access token from refresh token
    console.log('refresh')
    var refresh_token = req.query.refresh_token;
    console.log(refresh_token)
    var authOptions = {
      url: 'https://accounts.spotify.com/api/token',
      headers: { 'Authorization': 'Basic ' + (new Buffer(process.env.SPOTIFY_CLIENT_ID + ':' + process.env.SPOTIFY_CLIENT_SECRET).toString('base64')) },
      form: {
        grant_type: 'refresh_token',
        refresh_token: refresh_token
      },
      json: true
    };
  
    request.post(authOptions, function(error, response, body) {
      if (!error && response.statusCode === 200) {
        var access_token = body.access_token;
        res.send({
          'access_token': access_token
        });
      }
    });
  },
  createPlaylist: (req, res, next) => {
    return axios.post('https://api.spotify.com/v1/users//playlists', {
      name: 'suggestify',
      public: true
    })
  }
}