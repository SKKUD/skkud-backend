const express = require('express');
const { upload } = require('../middlewares/files');
const { authorizeLevel2 } = require('../middlewares/authorize');

const router = express.Router();
const {
  getAllPosts,
  getOnePost,
  createPost,
  addContributor,
  updatePost,
  deletePost,
} = require('../controllers/post');
const { contributorMiddleware } = require('../middlewares/contributors');

router.get('/', getAllPosts);

router.get('/:id', getOnePost);

// create
router.post('/', upload.any('images'), authorizeLevel2, createPost); //array 사용시 오류나서 걍  any로 씀

// update
router.post(
  '/revise/:id',
  contributorMiddleware,
  upload.any('images'),
  updatePost
);

router.patch('/contributor/:id', addContributor);

// destroy
router.delete('/:id', authorizeLevel2, deletePost);

module.exports = router;
