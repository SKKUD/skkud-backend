const mongoose = require('mongoose');

// schema
const userSchema = mongoose.Schema({
  // 1
  userID: { type: String, required: true },
  username: {type: String, required: true},
  passwd: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }, // 2
  updatedAt: { type: Date },
});

// model & export
const User = mongoose.model('user', userSchema);
module.exports = User;