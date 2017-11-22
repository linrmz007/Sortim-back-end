'use strict';

const User = require('../models/modelUser');

exports.auth = async (req, res) => {
  try {
    const user = await User.checkUserExists(req.body.id);
    if (user === null) await User.createUser(req.body);
    else await user.updateAccessToken(req.body.accessToken);
    res.sendStatus(200);
  } catch (e) {
    res.sendStatus(500);
  }
}

exports.saveEvents = async (req, res) => {
  try {
    const user = await User.checkUserExists(req.body.userId)
    await user.saveEvents(req.body.events);
    res.sendStatus(200);
  } catch (e) {
    res.sendStatus(500);
  }
}

exports.getOtherUsers = async (req, res) => {
  try {
    res.send(await User.getOtherUsers(req.params.eventId));
    console.log('get other users', getOtherUsers);
  } catch (e) {
    res.sendStatus(500);
  }
}
