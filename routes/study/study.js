const express = require('express');

const router = express.Router();

const {
  getAllStudies,
  getStudiesByStudyGroup,
  getOneStudy,
  createStudy,
  updateStudy,
  deleteStudy,
} = require('../../controllers/study/study');

router.get('/', getAllStudies);

router.get('/:studyGroupId', getStudiesByStudyGroup);

router.get('/:id', getOneStudy);

router.post('/:studyGroupId', createStudy);

router.patch('/:id', updateStudy);

router.delete('/:id', deleteStudy);
