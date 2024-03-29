const Study = require('../../models/study/Study');
const StudyGroup = require('../../models/study/StudyGroup');

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

const createStudy = async (req, res) => {
  try {
    const studyGroup = await StudyGroup.findById(req.params.studyGroupId);
    if (!studyGroup) {
      res.status(400).json({ status: 'fail', error: 'study group not found' });
    }
    const urlArr = req.files ? req.files.map((file) => file.location) : [];
    const study = new Study({
      ...req.body,
      images: urlArr,
    });
    const data = await study.save();
    res.status(200).json({ status: 'success', data });
  } catch (error) {
    res.status(400).json({ status: 'fail', error: error.message });
  }
};

const updateStudy = async (req, res) => {
  try {
    const updateProps = req.files
      ? {
          ...req.body,
          images: req.files.map((file) => file.location),
        }
      : req.body;
    const data = await Study.findOneAndUpdate(
      { _id: req.params.id },
      updateProps,
      { new: true }
    );
    if (!data) {
      res.status(404).json({ status: 'fail', error: 'study not found' });
    }
    res.status(200).json({ status: 'success', data });
  } catch (error) {
    res.status(400).json({ status: 'fail', error: error.message });
  }
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
