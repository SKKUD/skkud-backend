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

router.get('/', getAllAppliedUsers);

router.get('/:id', getOneAppliedUser);

router.post('/', createAppliedUser);

router.patch('/:id', updateAppliedUser);

router.delete('/:id', deleteAppliedUser);

router.delete('/', deleteAllAppliedUsers);

module.exports = router;
