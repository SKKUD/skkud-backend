const StudyGroup = require('../../models/study/StudyGroup');

const getAllStudyGroups = (req, res) => {
  StudyGroup.find({})
    .then((groups) => {
      if (!groups.length)
        return res.status(404).json({ err: 'posts not found' });
      res.status(200).json({
        status: 'success',
        data: groups,
      });
    })
    .catch((err) =>
      res.status(500).json({
        status: 'fail',
        error: err.message,
      })
    );
};

const getOneStudyGroup = (req, res) => {
  StudyGroup.findById(req.params.id)
    .then((group) =>
      res.status(200).json({
        status: 'success',
        data: group,
      })
    )
    .catch((error) =>
      res.status(400).json({
        status: 'fail',
        error,
      })
    );
};

const createStudyGroup = (req, res) => {
  const studyGroup = new StudyGroup(req.body);
  studyGroup
    .save()
    .then((data) => res.status(200).json({ status: 'success', data }))
    .catch((error) => res.status(400).json({ status: 'fail', error }));
};

const updateStudyGroup = (req, res) => {
  StudyGroup.findOneAndUpdate({ _id: req.params.id }, req.body)
    .then((data) => {
      if (!data) {
        res.status(404).json({ status: 'fail', error: 'studygroup not found' });
      }
      res.status(200).json({
        status: 'success',
        data,
      });
    })
    .catch((error) => {
      res.status(400).json({
        status: 'fail',
        error: error.message,
      });
    });
};

const deleteStudyGroup = (req, res) => {
  StudyGroup.findByIdAndDelete(req.params.id)
    .then((data) => {
      if (!data)
        res.status(404).json({ status: 'fail', error: 'studygroup not found' });
      res.status(200).json({
        status: 'success',
        message: 'deleted successfully',
      });
    })
    .catch((error) =>
      res.status(400).json({
        status: 'fail',
        error: error.message,
      })
    );
};

module.exports = {
  getAllStudyGroups,
  getOneStudyGroup,
  createStudyGroup,
  updateStudyGroup,
  deleteStudyGroup,
};
