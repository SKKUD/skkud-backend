const express = require('express');

const router = express.Router();
const {
  getAllUsers,
  getOneUser,
  createUser,
  updateUser,
  deleteUser,
  login,
  logout,
  verify,
} = require('../controllers/user');

const { auth } = require('../middlewares/auth');

router.get('/', getAllUsers);

router.get('/:id', getOneUser);

// create
router.post('/', createUser);

// update
router.patch('/:id', updateUser);

// destroy
router.delete('/:id', deleteUser);

router.post('/login', login);

router.post('/logout', auth, logout);

router.post('/verify', auth, verify);

module.exports = router;
