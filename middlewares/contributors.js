const User = require('../models/User');
const Post = require('../models/Post');

const contributorMiddleware = async (req, res, next) => {
  try {
    const initializeContributors = req.body.initializeContributors;
    if (req.body.users) {
      res.status(400).json({
        status: 'fail',
        error:
          '생성 및 수정사항에 contributors를 직접적으로 명시해서는 안됩니다.',
      });
      return;
    }
    const addContributors = req.body.addContributors;
    const deleteContributors = req.body.deleteContributors;
    if (initializeContributors) {
      initializeContributors.forEach(async (userID) => {
        const user = await User.findById(userID);
        if (user) {
          user.projects = [...user.projects, req.params.id];
          user.save();
        }
      });
      req.body.users = initializeContributors;
    }
    if (addContributors) {
      addContributors.forEach(async (userID) => {
        const user = await User.findById(userID);
        if (user) {
          user.projects = [...user.projects, req.params.id];
          user.save();
        }
      });
      // eslint-disable-next-line no-case-declarations
      const post = await Post.findById(req.params.id);
      post.users = [...post.users, ...addContributors];
      post.save();
    }
    if (deleteContributors) {
      deleteContributors.forEach(async (userID) => {
        const user = await User.findOne({ userID: userID });
        if (user) {
          user.projects = user.projects.filter(
            (item) => item !== req.params.id
          );
          user.save();
        }
      });
      const post = await Post.findById(req.params.id);

      post.users = post.users.filter(
        (user) => deleteContributors.indexOf(String(user)) < 0
      );
      post.save();
    }
    next();
  } catch (error) {
    res.status(400).json({ status: 'fail', error: error.message });
  }
};

module.exports = { contributorMiddleware };
