const mongoose = require('mongoose');

const studyGroupSchema = mongoose.Schema({
  groupName: {
    type: String,
    required: true,
  },
  members: {
    type: [String],
    ref: 'User',
    required: true,
  },
  studyDay: {
    type: String,
    enum: ['월', '화', '수', '목', '금', '토', '일'],
    required: true,
  },
});

const StudyGroup = mongoose.model('StudyGroup', studyGroupSchema);
module.exports = StudyGroup;
