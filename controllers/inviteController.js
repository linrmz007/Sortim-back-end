'use strict';

const Invite = require('../models/modelInvite');
const nodemailer = require('nodemailer');


const transporter = nodemailer.createTransport({
 service: 'gmail',
 auth: {
        user: 'annacollins85@gmail.com',
        pass: 'CodingCathy368!'
    }
});

exports.invite = async (req, res) => {
  try {
    const id = Invite.createId(req.body.otherUser.email, req.body.currentUser.email);
    const invite = await Invite.checkForInvite(id);
    if (invite === null) {
      await Invite.createInvite(id, req.params.eventId);
      res.send('invite sent')
      console.log('invite sent');
      return res.sendStatus(200);
    }
    else {
      transporter.sendMail({
        from: req.body.otherUser[0],
        to: 'annacollins85@gmail.com',
        subject: 'Someone on Sortim wants to connect with you',
        text: `Hello ${req.body.currentUser.name}! Someone swiped right and wants to connect with you on Sortim. Here's their email address ${req.body.otherUser.email}`
      }, function (err, info) {
        if (err) console.log(err);
        else console.log(info);
      })
      return res.status(200).send('email sent');
    }
  } catch (e) {
    console.error(e.message);
    return res.sendStatus(500);
  }
}
