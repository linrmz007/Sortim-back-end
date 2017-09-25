'use strict';

const User = require('../models/modelUser');

exports.auth = async (req, res) => {
  try {
    const user = await model.checkUserExists(req.body.id);
    if (user === null) await model.createUser(req.body)
    else await model.updateAccessToken(req.body.accessToken)
    res.sendStatus(200);
  } catch (e) {
    res.sendStatus(500);
  }
}

exports.saveEvents = async (req, res) => {
  try {
    await model.saveEvents(req.body.userId, req.body.events);
    res.sendStatus(200);
  } catch (e) {
    res.sendStatus(500);
  }
}

exports.getOtherUsers = async (req, res) => {
  try {
    res.send(await model.getOtherUsers(req.params.eventId));
  } catch (e) {
    res.sendStatus(500);
  }
}
