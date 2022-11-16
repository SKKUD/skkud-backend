const AppliedUser = require('../../models/apply/appliedUser');
const Applier = require('../../models/apply/applier');

const getAllAppliedUsers = (req, res) => {
  AppliedUser.find()
    .then((data) => res.status(200).json({ status: 'success', data }))
    .catch((error) => res.status(500).json({ status: 'fail', error }));
};

const getOneAppliedUser = (req, res) => {
  AppliedUser.findById(req.params.id)
    .then((data) => {
      if (!data) {
        res
          .status(404)
          .json({ status: 'fail', error: '지원자를 찾을 수 없습니다.' });
      } else {
        res.status(200).json({ status: 'success', data });
      }
    })
    .catch((error) => res.status(500).json({ status: 'fail', error }));
};

const createAppliedUser = (req, res) => {
  Applier.findOne({})
    .then((data) => {
      if (!data) {
        res.status(404).json({
          status: 'fail',
          error: '지원 양식이 없는 상태에서 지원자를 추가할 수 없습니다.',
        });
      } else if (
        req.body.documentAnswers &&
        req.body.documentAnswers.length === data.questions.length
      ) {
        const user = new AppliedUser(req.body);
        user
          .save()
          .then((result) =>
            res.status(200).json({ status: 'success', data: result })
          )
          .catch((error) => res.status(400).json({ status: 'fail', error }));
      } else {
        res.status(403).json({
          status:
            'applier의 questions 개수와 appliedUser의 documentAnswer 개수는 같아야 합니다.',
        });
      }
    })
    .catch((error) => res.status(500).json({ status: 'fail', error }));
};

const updateAppliedUser = (req, res) => {
  AppliedUser.findOneAndUpdate({ _id: req.params.id }, req.body)
    .then((data) => {
      if (!data) {
        res
          .status(400)
          .json({ status: 'fail', error: '지원자를 찾을 수 없습니다.' });
      } else {
        res.status(200).json({ status: 'success', data });
      }
    })
    .catch((error) => res.status(500).json({ status: 'fail', error }));
};

const deleteAppliedUser = (req, res) => {
  AppliedUser.findOneAndDelete({ _id: req.params.id })
    .then((data) => {
      if (!data) {
        res
          .status(404)
          .json({ status: 'fail', error: '지원자를 찾을 수 없습니다.' });
      } else {
        res.status(200).json({ status: 'success', data });
      }
    })
    .catch((error) => res.status(500).json({ status: 'fail', error }));
};

const deleteAllAppliedUsers = (req, res) => {
  AppliedUser.deleteMany({})
    .then((data) => res.status(200).json({ status: 'success', data }))
    .catch((error) => res.status(500).json({ status: 'fail', error }));
};

module.exports = {
  getAllAppliedUsers,
  getOneAppliedUser,
  createAppliedUser,
  updateAppliedUser,
  deleteAppliedUser,
  deleteAllAppliedUsers,
};
