'use strict';

const Invite = require('../models/modelInvite');
const nodemailer = require('nodemailer');


const transporter = nodemailer.createTransport({
 service: 'gmail',
 auth: {
        user: 'annacollins85@gmail.com',
        pass: 'Snowboard14'
    }
});

const emailBody = `Hello ...! ... swiped right and wants to connect with you on Sortim. Here's their email address ...`;

const mailOptions = {
  from: 'annacollins85@gmail.com',
  to: 'annacollins85@gmail.com',
  subject: 'Someone on Sortim wants to connect with you',
  text: emailBody
};

exports.invite = async (req, res) => {
  try {
    const id = Invite.createId(req.body.otherUser, req.body.currentUser);
    const invite = await Invite.checkForInvite(id);
    if (invite === null) {
      await Invite.createInvite(id, req.params.eventId);
      res.send('invite sent')
      console.log('invite sent');
      return res.sendStatus(200);
    }
    else {
      transporter.sendMail(mailOptions, function (err, info) {
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
