const express = require('express');
const { upload } = require('../middlewares/files');

const router = express.Router();
const {
  getAllUsers,
  getUsersByProjectId,
  getMultipleUsers,
  getOneUser,
  createUser,
  updateUser,
  deleteUser,
} = require('../controllers/user');

router.get('/', getAllUsers);

router.get('/:id', getOneUser);

router.get('/byProject/:projectID', getUsersByProjectId);

router.get('/multiple', getMultipleUsers);

// create
router.post('/', upload.any('image'), createUser);

// update
router.patch('/:id', upload.any('image'), updateUser);

// destroy
router.delete('/:id', deleteUser);

module.exports = router;
