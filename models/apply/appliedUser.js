const mongoose = require('mongoose');

const appliedUserSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

const AppliedUser = mongoose.model('AppliedUser', appliedUserSchema);
module.exports = AppliedUser;
