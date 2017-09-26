'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema ({
  accessToken: String,
  name: String,
  id: Number,
  email: String,
  img: String,
  events: [String],
});

UserSchema.statics.checkUserExists = function (userId) {
  return this.findOne({id:userId});
}

UserSchema.methods.updateAccessToken = function (accessToken) {
  this.accessToken = accessToken;
  this.save();
}

UserSchema.methods.saveEvents = function (eventIds) {
  this.events = eventIds;
  this.save();
}

UserSchema.statics.getOtherUsers = function (eventId) {
  return this.find({events:eventId});
}

const User = mongoose.model('users', UserSchema, 'sortimUsers');

User.createUser = async (authObj) => {
  const user = new User({accessToken:authObj.accessToken, name:authObj.name, id:authObj.id, email:authObj.email, img: authObj.img, events: []});
  return await user.save();
}

module.exports = User;
