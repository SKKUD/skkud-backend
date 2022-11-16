const express = require('express');

const router = express.Router();

const {
  getAllAppliedUsers,
  getOneAppliedUser,
  createAppliedUser,
  updateAppliedUser,
  deleteAllAppliedUsers,
  deleteAppliedUser,
} = require('../../controllers/apply/appliedUser');
const { authorize, authorizeLevel2 } = require('../../middlewares/authorize');

router.get('/', authorize, getAllAppliedUsers);

router.get('/:id', authorize, getOneAppliedUser);

router.post('/', createAppliedUser);

router.patch('/:id', authorizeLevel2, updateAppliedUser);

router.delete('/:id', authorizeLevel2, deleteAppliedUser);

router.delete('/', authorizeLevel2, deleteAllAppliedUsers);

module.exports = router;
