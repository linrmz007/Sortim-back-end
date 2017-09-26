'use strict';

const Invite = require('../models/modelInvite');

exports.invite = async (req, res) => {
  console.log('inviting');
  try {
    const id = Invite.createId(req.body.otherUser, req.body.currentUser);
    const invite = await Invite.checkForInvite(id);
    if (invite === null) {
      await Invite.createInvite(id, req.params.eventId);
      res.send('invite sent')
      return res.sendStatus(200);
    }
    else return res.status(200).send('send email');
  } catch (e) {
    console.error(e.message);
    res.sendStatus(500);
  }
}
