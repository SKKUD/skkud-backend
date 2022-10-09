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
router.post('/', upload.single('profileImg'), createPost);

// update
router.patch('/:id', updatePost);

// destroy
router.delete('/:id', deletePost);

module.exports = router;
