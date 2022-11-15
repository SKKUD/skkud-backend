const express = require('express');

const router = express.Router();

const {
  getApplier,
  createApplier,
  updateApplier,
  deleteApplier,
} = require('../../controllers/apply/applier');
const { isThereAppliedUser } = require('../../middlewares/apply');

router.get('/', getApplier);

router.post('/', createApplier);

router.patch('/', isThereAppliedUser, updateApplier);

router.delete('/', isThereAppliedUser, deleteApplier);

module.exports = router;
