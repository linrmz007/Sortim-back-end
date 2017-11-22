'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const InviteSchema = new Schema ({
  id: String,
  eventId: Number,

})

InviteSchema.index({id:1, eventId:1}, {unique:true})

InviteSchema.statics.createId = function (id1, id2, eventId) {
  let id = id1 < id2
    ? id1 + 'v' + id2
    : id2 + 'v' + id1;

  if (eventId) id += `v${eventId}`

  return id;
}

InviteSchema.statics.checkForInvite = function (inviteId) {
  return this.findOne({id:inviteId});
}

InviteSchema.statics.createInvite = async (inviteId, eventId) => {
  const invite = new Invite({id:inviteId, eventId: eventId});
  await invite.save();
}

const Invite = mongoose.model('invites', InviteSchema, 'sortimInvites');

module.exports = Invite;
