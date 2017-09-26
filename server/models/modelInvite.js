'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const InviteSchema = new Schema ({
  id: String,
  eventId: Number,

})

InviteSchema.index({id:1, eventId:1}, {unique:true})

InviteSchema.statics.createId = function (id1, id2) {
  if (id1 < id2) return id1 + 'v' + id2;
  else return id2 + 'v' + id1;
}

InviteSchema.statics.checkForInvite = function (inviteId) {
  return this.findOne({id:inviteId});
}

const Invite = mongoose.model('invites', InviteSchema, 'sortimInvites');

exports.createInvite = async (inviteId, eventId) => {
  const invite = new Invite({id:inviteId, eventId: eventId});
  await invite.save();
}
