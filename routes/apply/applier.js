const express = require('express');

const router = express.Router();

const {
  getApplier,
  createApplier,
  updateApplier,
  deleteApplier,
} = require('../../controllers/apply/applier');
const { isThereAppliedUser } = require('../../middlewares/apply');
const { authorizeLevel3 } = require('../../middlewares/authorize');

router.get('/', getApplier);

router.post('/', createApplier);

router.patch('/', isThereAppliedUser, authorizeLevel3, updateApplier);

router.delete('/', isThereAppliedUser, authorizeLevel3, deleteApplier);

module.exports = router;
