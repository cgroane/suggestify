/** @type {import("express").RequestHandler} */
const spotifyController = require('../controllers/spotify')
const express = require('express');
const router = express.Router();


router.get('/api/spotify-login', spotifyController.spotifyAuth);
router.get('/api/refresh_token', spotifyController.getRefreshToken);
router.get('/api/callback', spotifyController.getCallback);
router.post('/api/sms/:user_id', spotifyController.createPlaylist);

module.exports = router;