const express = require('express');
const { upload } = require('../middlewares/files');

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
router.post('/', upload.any('images'), createPost); //array 사용시 오류나서 걍  any로 씀

// update
router.patch('/:id', updatePost);

// destroy
router.delete('/:id', deletePost);

module.exports = router;
