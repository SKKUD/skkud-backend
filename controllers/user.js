const User = require('../models/User');
const Post = require('../models/Post');

const getAllUsers = (req, res) => {
  User.find()
    .then((users) =>
      res.status(200).json({
        status: 'success',
        data: {
          users,
        },
      })
    )
    .catch((error) =>
      res.status(500).json({
        status: 'fail',
        error: error.message,
      })
    );
};

const getUsersByProjectId = async (req, res) => {
  try {
    const post = await Post.findById(req.params.projectID).lean();
    if (!post) {
      res.status(404).json({ status: 'fail', error: 'Post Not Found' });
      return;
    }
    const users = await User.find().where('_id').in(post.users).lean();
    res.status(200).json({ status: 'success', data: users });
  } catch (error) {
    res.status(500).json({ status: 'fail', error: error.message });
  }
};

const getMultipleUsers = async (req, res) => {
  try {
    const searchingUsers = req.body.searchingUsers;
    let users = await User.find();
    users = users.filter(
      (user) => searchingUsers.indexOf(String(user._id)) >= 0
    );
    res.status(200).json({ status: 'success', data: users });
  } catch (error) {
    res.status(500).json({ status: 'fail', error: error.message });
  }
};

const getOneUser = (req, res) => {
  const id = req.params.id;
  User.findOne({ userID: id })
    .then((user) =>
      res.status(200).json({
        status: 'success',
        data: {
          user,
        },
      })
    )
    .catch((error) =>
      res.status(404).json({
        status: 'fail',
        error: error.message,
      })
    );
};

const createUser = (req, res) => {
  const url = 'https://api.skku.dev';
  let user;
  if (req.files) {
    const imgUrl = `${url}/public/${req.files[0].filename}`;
    user = new User({
      ...req.body,
      image: imgUrl,
    });
  } else {
    user = new User(req.body);
  }
  user
    .save()
    .then((data) =>
      res.status(200).json({
        status: 'success',
        data,
      })
    )
    .catch((error) =>
      res.status(400).json({
        status: 'fail',
        error: error.message,
      })
    );
};

const updateUser = (req, res) => {
  req.body.updatedAt = Date.now();
  User.findOneAndUpdate({ userID: req.params.id }, req.body, { new: true })
    .then((data) => {
      if (!data) {
        res.status(404).json({ status: 'fail', error: 'user not found' });
      } else {
        res.status(200).json({
          status: 'success',
          data,
        });
      }
    })
    .catch((error) => {
      res.status(400).json({
        status: 'fail',
        error: error.message,
      });
    });
};

const deleteUser = (req, res) => {
  User.findOneAndDelete({ userID: req.params.id })
    .then(() =>
      res.status(200).json({
        status: 'success',
        message: 'deleted successfully',
      })
    )
    .catch((error) =>
      res.status(400).json({
        status: 'fail',
        error: error.message,
      })
    );
};

module.exports = {
  getAllUsers,
  getUsersByProjectId,
  getMultipleUsers,
  getOneUser,
  createUser,
  updateUser,
  deleteUser,
};
