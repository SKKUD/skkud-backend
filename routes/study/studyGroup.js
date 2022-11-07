const express = require('express');

const router = express.Router();

const {
  getAllStudyGroups,
  getOneStudyGroup,
  createStudyGroup,
  updateStudyGroup,
  deleteStudyGroup,
} = require('../../controllers/study/studyGroup');

router.get('/', getAllStudyGroups);

router.get('/:id', getOneStudyGroup);

router.post('/', createStudyGroup);

router.patch('/:id', updateStudyGroup);

router.delete('/:id', deleteStudyGroup);

module.exports = router;
