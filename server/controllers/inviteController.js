'use strict';

const Invite = require('../models/modelInvite');

exports.invite = async (req, res) => {
  try {
    const id = Invite.createId(req.body.otherUser, req.body.currentUser);
    const invite = await Invite.checkForInvite(id);
    if (invite === null) {
      await Invite.createInvite(id, req.body.eventId);
      res.sendStatus(200);
    }
    else res.send('connect users');
    res.sendStatus(200);
  } catch (e) {
    res.sendStatus(500);
  }
}

exports.checkForInvite = async (req, res) => {
  try {
    await Invite.checkForInvite(req.body.currentUser, req.body.otherUser);
    res.sendStatus(200);
  } catch (e) {
    res.sendStatus(500);
  }
}
