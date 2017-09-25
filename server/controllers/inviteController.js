'use strict';

const User = require('../models/modelInvite');

exports.invite = async (req, res) => {
  try {
    await model.invite(req.body.currentUser, req.body.otherUser, req.params.eventId);
    res.sendStatus(200);
  } catch (e) {
    res.sendStatus(500);
  }
}
