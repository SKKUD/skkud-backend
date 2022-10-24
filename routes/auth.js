const express = require('express');

const router = express.Router();

const { login, logout, verify } = require('../controllers/auth');
const { authorize } = require('../middlewares/authorize');

router.post('/login', login);

router.post('/logout', authorize, logout);

router.post('/verify', authorize, verify);

module.exports = router;
