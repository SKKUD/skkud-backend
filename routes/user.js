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
const { authorizeLevel2 } = require('../middlewares/authorize');

router.get('/', getAllUsers);

router.get('/multiple', getMultipleUsers);

router.get('/:id', getOneUser);

router.get('/byProject/:projectID', getUsersByProjectId);

// create
router.post('/', upload.any('image'), authorizeLevel2, createUser);

// update
router.patch('/:id', upload.any('image'), updateUser);

// destroy
router.delete('/:id', deleteUser);

module.exports = router;
