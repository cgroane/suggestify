/** @type {import("express").RequestHandler} */
const express = require('express');
const router = express.Router();
const twilioController = require('../controllers/twilio');
const spotifyController = require('../controllers/spotify');
const firebase_users = require("../controllers/firebase_users");


router.post('/api/new-account', twilioController.sendWelcomeMessage);

/**
 * if receive text to add playlist fails with bad error code --> next (get refreshtoken) --> update user and res.redirect to 'api/sms' with original request
 * if receiveTextToAddToPlaylist succeeds, send two texts
 */
router.post('/api/sms', twilioController.receiveTextToAddToPlaylist, spotifyController.getRefreshToken, firebase_users.updateUser);
router.post('/api/alert', );


module.exports = router;