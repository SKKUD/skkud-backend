const express = require('express');

const router = express.Router();
const { authorize } = require('../../middlewares/authorize');

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

router.post('/:studyGroupId', authorize, createStudy);

router.patch('/:id', authorize, updateStudy);

router.delete('/:id', authorize, deleteStudy);

module.exports = router;
