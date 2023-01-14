const mongoose = require('mongoose');

const studySchema = mongoose.Schema({
  groupId: {
    type: mongoose.Types.ObjectId,
    ref: 'StudyGroup',
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  images: {
    type: [String],
  },
  content: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    default: '장소 미정',
  },
  attendance: {
    type: [String],
    default: [],
    ref: 'User',
  },
  taskNames: {
    type: [String],
    default: [],
  },
  taskContents: {
    type: [String],
    default: [],
  },
  studyTimeStart: {
    type: Date,
    required: true,
  },
  studyTimeEnd: {
    type: Date,
    required: true,
  },
});

const Study = mongoose.model('Study', studySchema);
module.exports = Study;
