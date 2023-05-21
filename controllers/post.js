const Post = require('../models/Post');
const User = require('../models/User');

const getAllPosts = (req, res) => {
  Post.find({})
    .then((posts) => {
      if (!posts.length)
        return res.status(404).json({ err: 'posts not found' });
      res.status(200).json({
        status: 'success',
        data: posts,
      });
    })
    .catch((err) =>
      res.status(500).json({
        status: 'fail',
        error: err.message,
      })
    );
};

const getOnePost = (req, res) => {
  Post.findById(req.params.id)
    .then((post) =>
      res.status(200).json({
        status: 'success',
        data: post,
      })
    )
    .catch((error) =>
      res.status(400).json({
        status: 'fail',
        error,
      })
    );
};

const createPost = async (req, res) => {
  try {
    const url = 'https://api.skku.dev';
    req.body.users = req.body.initializeContributors;
    let post;
    if (req.files) {
      const urlArr = [];
      for (let i = 0; i < req.files.length; i += 1) {
        urlArr.push(`${url}/public/${req.files[i].filename}`);
      }
      post = new Post({
        ...req.body,
        mainimage: urlArr[0],
        images: urlArr,
      });
    } else {
      post = new Post(req.body);
    }
    const data = await post.save();
    await User.updateMany(
      { _id: { $in: req.body.initializeContributors } },
      { $addToSet: { projects: data._id } }
    );
    res.status(200).json({ status: 'success', data });
  } catch (error) {
    res.status(400).json({ status: 'fail', error: error.message });
  }
};

const updatePost = async (req, res) => {
  req.body.updatedAt = Date.now();
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      res.status(404).json({ status: 'fail', error: 'Post Not Found' });
      return;
    }
    const url = 'https://api.skku.dev';
    const urlArr = req.files
      ? req.files.map((file) => `${url}/public/${file.filename}`)
      : post.images;
    const updatedUsers = post.users
      .map((user) => String(user))
      .filter((user) => !req.body.deleteContributors.includes(user))
      .concat(req.body.addContributors)
      .filter((user, index, self) => self.indexOf(user) === index);
    const data = await Post.findOneAndUpdate(
      { _id: req.params.id },
      {
        ...req.body,
        users: updatedUsers,
        mainimage: urlArr[0],
        images: urlArr,
      },
      { new: true }
    );
    await Promise.all([
      User.updateMany(
        { _id: { $in: req.body.addContributors } },
        { $addToSet: { projects: data._id } }
      ),
      User.updateMany(
        { _id: { $in: req.body.deleteContributors } },
        { $pull: { projects: data._id } }
      ),
    ]);
    res.status(200).json({ status: 'success', data });
  } catch (error) {
    res.status(400).json({ status: 'fail', error: error.message });
  }
};

const deletePost = async (req, res) => {
  try {
    const deleted = await Post.findOneAndDelete({ _id: req.params.id });
    if (deleted) {
      await User.updateMany(
        { _id: { $in: deleted.users } },
        { $pull: { projects: deleted._id } }
      );
    }
    res.status(200).json({ status: 'success', data: 'successfully deleted' });
  } catch (error) {
    res.status(400).json({ status: 'fail', error });
  }
};

module.exports = {
  getAllPosts,
  getOnePost,
  createPost,
  updatePost,
  deletePost,
};
