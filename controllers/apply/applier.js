const Applier = require('../../models/apply/applier');

const getApplier = (req, res) => {
  Applier.find()
    .then((applier) => {
      if (!applier) {
        res.status(404).json({ status: 'fail', error: 'applier not found' });
      } else {
        res.status(200).json({ status: 'success', data: applier });
      }
    })
    .catch((error) => res.status(500).json({ status: 'fail', error }));
};

const createApplier = (req, res) => {
  Applier.find().then((data) => {
    if (data) {
      res
        .status(403)
        .json({ status: 'fail', error: '이미 지원 양식이 존재합니다.' });
    } else {
      const applier = new Applier(req.body);
      applier
        .save()
        .then((got) => res.status(200).json({ status: 'success', data: got }))
        .catch((error) => res.status(400).json({ status: 'fail', error }));
    }
  });
};

const updateApplier = (req, res) => {
  Applier.findOneAndUpdate({}, req.body)
    .then((data) => {
      if (!data) {
        res.status(404).json({ status: 'fail', error: 'applier not found' });
      } else {
        res.status(200).json({ status: 'success', data });
      }
    })
    .catch((error) => res.status(400).json({ status: 'fail', error }));
};

const deleteApplier = (req, res) => {
  Applier.findOneAndDelete({})
    .then((data) => {
      if (!data) {
        res.status(404).json({ status: 'fail', error: 'applier not found' });
      } else {
        res.status(200).json({ status: 'success', data });
      }
    })
    .catch((error) => res.status(500).json({ status: 'fail', error }));
};

module.exports = { getApplier, createApplier, updateApplier, deleteApplier };
