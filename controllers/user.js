const express = require('express');

const router = express.Router();
const {
    getAllUsers,
    getOneUser,
    createUser,
    updateUser,
    deleteUser,
} = require('../middlewares/user');

router.get('/', getAllUsers);

router.get('/:id',  getOneUser);

// create
router.post('/create', createUser);

// update
router.patch('/:id', updateUser);

// destroy
router.delete('/:id', deleteUser);

module.exports = router;