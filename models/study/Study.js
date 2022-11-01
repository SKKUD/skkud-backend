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
  content: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    default: '장소 미정',
  },
  attendance: {
    type: [mongoose.Types.ObjectId],
    default: [],
    ref: 'User',
  },
  task: {
    type: [{ name: String, task: String }],
    required: true,
  },
  studyTime: {
    type: Date,
    required: true,
  },
});

const Study = mongoose.model('Study', studySchema);
module.exports = Study;
