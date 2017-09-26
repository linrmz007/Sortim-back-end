'use strict';

const express = require('express');
const userController = require('./controllers/userController.js');
const inviteController = require('./controllers/inviteController.js');

const router = express.Router();

router.post('/login', userController.auth);
router.post('/events', userController.saveEvents);
router.get('/events/:eventId', userController.getOtherUsers);
router.post('/events/:eventId/:otherUserId', inviteController.invite);
router.get('/events/:eventId/:otherUserId', inviteController.checkForInvite);

module.exports = router;
