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
    User.findById(id)
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
    const {userID, username, passwd} = req.body;
    const user = new User({
      userID: userID,
      username: username,
      passwd : passwd,

    });
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
    User.findOneAndUpdate({ _id: req.params.id }, req.body)
      .then((data) => {
        if (!data) {
          res.status(404).json({ status: 'fail', error: '404 Not Found' });
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

const deleteUser = (req, res) => {
    User.findByIdAndDelete(req.params.id)
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