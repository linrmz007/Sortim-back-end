'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const InviteSchema = new Schema ({
  id: String,
  eventId: Number,
})

const Invite = mongoose.model('invites', InviteSchema, 'sortimUsers');

exports.createInvite = async (currentUser, otherUser, eventId) => {
  const inviteId = currentUser + 'v' + otherUser;
  const invite = new Invite({id:inviteId, eventId: eventId});
  await invite.save();
}
