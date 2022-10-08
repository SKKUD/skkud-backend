const express = require('express');

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
router.post('/', createPost);

// update
router.patch('/:id', updatePost);

// destroy
router.delete('/:id', deletePost);

module.exports = router;