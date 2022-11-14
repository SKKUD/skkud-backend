const express = require('express');
const { upload } = require('../middlewares/files');
const { authorizeLevel2 } = require('../middlewares/authorize');

const router = express.Router();
const {
  getAllPosts,
  getOnePost,
  createPost,
  updatePost,
  deletePost,
} = require('../controllers/post');

router.get('/', getAllPosts);

router.get('/:id', getOnePost);

// create
router.post('/', authorizeLevel2, upload.any('images'), createPost); //array 사용시 오류나서 걍  any로 씀

// update
router.patch('/:id', authorizeLevel2, upload.any('images'), updatePost);

// destroy
router.delete('/:id', authorizeLevel2, deletePost);

module.exports = router;
