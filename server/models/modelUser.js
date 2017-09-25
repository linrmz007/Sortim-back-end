'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema ({
  accessToken: String,
  name: String,
  id: Number,
  img: String,
  events: Array,
});

UserSchema.statics.checkUserExists = (userId) => {
  return this.findOne({id:userId});
}

UserSchema.methods.updateAccessToken = (accessToken) => {
  return this.update({id: userId}, {$set:{accessToken:accessToken}})
}

UserSchema.methods.saveEvents = (eventIds) => {
  return this.update({id: userId}, {$set:{events:eventIds}});
}

UserSchema.statics.getOtherUsers = (eventId) => {
  return this.find({events:eventId});
}

const User = mongoose.model('users', UserSchema, 'sortimUsers');

User.createUser = async (authObj) => {
  const user = new User({accessToken:authObj.accessToken, name:authObj.name, id:authObj.id, img: authObj.picture.data.img, events: []});
  return await user.save();
}

module.exports = User;
