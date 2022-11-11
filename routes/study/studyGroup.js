const express = require('express');

const router = express.Router();
const { authorizeLevel2 } = require('../../middlewares/authorize');

const {
  getAllStudyGroups,
  getOneStudyGroup,
  createStudyGroup,
  updateStudyGroup,
  deleteStudyGroup,
} = require('../../controllers/study/studyGroup');

router.get('/', getAllStudyGroups);

router.get('/:id', getOneStudyGroup);

router.post('/', authorizeLevel2, createStudyGroup);

router.patch('/:id', authorizeLevel2, updateStudyGroup);

router.delete('/:id', authorizeLevel2, deleteStudyGroup);

module.exports = router;
