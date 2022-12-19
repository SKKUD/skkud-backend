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
  track: {
    type: String,
    required: true,
  },
  documentAnswers: {
    type: [String],
    default: [],
  },
  documentScores: {
    type: [Number],
    default: [],
  },
  interviewScores: {
    type: [Number],
    default: [],
  },
});

const AppliedUser = mongoose.model('AppliedUser', appliedUserSchema);
module.exports = AppliedUser;
