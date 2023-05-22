const express = require('express');

const router = express.Router();
const { authorize } = require('../../middlewares/authorize');
const { upload } = require('../../middlewares/files');

const {
  getAllStudies,
  getStudiesByStudyGroup,
  getOneStudy,
  createStudy,
  updateStudy,
  deleteStudy,
} = require('../../controllers/study/study');

router.get('/', getAllStudies);

router.get('/byStudyGroup/:studyGroupId', getStudiesByStudyGroup);

router.get('/:id', getOneStudy);

router.post('/', authorize, upload.any('images'), createStudy);

router.patch('/:id', authorize, upload.any('images'), updateStudy);

router.delete('/:id', authorize, deleteStudy);

module.exports = router;
