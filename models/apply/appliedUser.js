const mongoose = require('mongoose');

const appliedUserSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  studentId: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  documentAnswers: {
    type: [String],
  },
});

const AppliedUser = mongoose.model('AppliedUser', appliedUserSchema);
module.exports = AppliedUser;
