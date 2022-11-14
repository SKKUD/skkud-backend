const mongoose = require('mongoose');

const applierSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  introduction: {
    //SKKU.D와 지원 방식에 대한 소개
    type: String,
    required: true,
  },
  questions: {
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

const Applier = mongoose.model('Applier', applierSchema);
module.exports = Applier;
