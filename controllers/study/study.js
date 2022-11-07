const { Types } = require('mongoose');
const Study = require('../../models/study/Study');

const getAllStudies = (req, res) => {
  Study.find({})
    .then((studies) => {
      res.status(200).json({ status: 'success', data: studies });
    })
    .catch((error) => {
      res.status(400).json({ status: 'fail', error: error.message });
    });
};

const getStudiesByStudyGroup = (req, res) => {
  Study.find({ groupId: req.params.studyGroupId })
    .then((studies) => {
      res.status(200).json({ status: 'success', data: studies });
    })
    .catch((error) =>
      res.status(400).json({ status: 'fail', error: error.message })
    );
};

const getOneStudy = (req, res) => {
  Study.findById(req.params.id)
    .then((data) => {
      res.status(200).json({ status: 'success', data });
    })
    .catch((error) => {
      res.status(400).json({ status: 'fail', error: error.message });
    });
};

const createStudy = (req, res) => {
  const study = new Study(req.body);
  study.groupId = new Types.ObjectId(req.params.studyGroupId);
  study
    .save()
    .then((data) => res.status(200).json({ status: 'success', data }))
    .catch((error) =>
      res.status(400).json({ status: 'fail', error: error.message })
    );
};

const updateStudy = (req, res) => {
  Study.findOneAndUpdate({ _id: req.params.id }, req.body)
    .then((data) => res.status(200).json({ status: 'success', data }))
    .catch((error) =>
      res.status(400).json({ status: 'fail', error: error.message })
    );
};

const deleteStudy = (req, res) => {
  Study.findOneAndDelete({ _id: req.params.id })
    .then((data) => res.status(200).json({ status: 'success', data }))
    .catch((error) =>
      res.status(400).json({ status: 'fail', error: error.message })
    );
};

module.exports = {
  getAllStudies,
  getStudiesByStudyGroup,
  getOneStudy,
  createStudy,
  updateStudy,
  deleteStudy,
};
