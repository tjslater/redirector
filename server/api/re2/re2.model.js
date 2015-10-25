'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var Re2Schema = new Schema({
  data: [Schema.Types.Mixed],
  userId: Schema.Types.ObjectId,
  description: String
});



module.exports = mongoose.model('Re2', Re2Schema);