const User = require('../models/User');

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
  const url = `${req.protocol}://${req.get('host')}`;
  let user;
  if (req.files.length !== 0) {
    const imgUrl = `${url}/public/${req.files[0].filename}`;
    user = new User({
      ...req.body,
      image: imgUrl,
    });
  } else {
    user = new User({
      userID: req.body.userID,
      username: req.body.username,
      usernameEng: req.body.usernameEng,
      email: req.body.email,
      passwd: req.body.passwd,
      track: req.body.track,
      role: req.body.role,
      otherLinks: req.body.otherLinks,
      bio: req.body.bio,
      insta: req.body.insta,
    });
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
  getOneUser,
  createUser,
  updateUser,
  deleteUser,
};
