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

const createPost = (req, res) => {
  const url = `${req.protocol}://${req.get('host')}`;
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

  post
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

const updatePost = (req, res) => {
  req.body.updatedAt = Date.now(); //2

  if (req.files) {
    const url = `${req.protocol}://${req.get('host')}`;
    const urlArr = [];
    for (let i = 0; i < req.files.length; i += 1) {
      urlArr.push(`${url}/public/${req.files[i].filename}`);
    }
    Post.findOneAndUpdate(
      { _id: req.params.id },
      {
        ...req.body,
        mainimage: urlArr[0],
        images: urlArr,
      }
    )
      .then((data) => {
        if (!data) {
          res.status(404).json({ status: 'fail', error: '404 Not Found' });
        }
        res.status(200).json({
          status: 'success',
          data,
        });
      })
      .catch((error) =>
        res.status(400).json({
          status: 'fail',
          error: error.message,
        })
      );
  } else {
    const prePost = Post.findById(req.params.id);
    Post.findOneAndUpdate(
      { _id: req.params.id },
      {
        ...req.body,
        mainimage: prePost.mainimage,
        images: prePost.images,
      }
    )
      .then((data) => {
        if (!data) {
          res.status(404).json({ status: 'fail', error: '404 Not Found' });
        }
        res.status(200).json({
          status: 'success',
          data,
        });
      })
      .catch((error) =>
        res.status(400).json({
          status: 'fail',
          error: error.message,
        })
      );
  }
};

const addContributor = async (req, res) => {
  try {
    const contributors = req.body.contributors;
    contributors.forEach(async (userID) => {
      const user = await User.findById(userID);
      if (user) {
        user.projects = [...user.projects, req.params.id];
        user.save();
      }
    });
    const post = await Post.findById(req.params.id);
    post.users = [...post.users, ...contributors];
    post.save();
    res.status(200).json({ status: 'success', data: post });
  } catch (error) {
    res.status(400).json({ status: 'fail', error: error.message });
  }
};

const deleteContributor = async (req, res) => {
  try {
    const contributors = req.body.contributors;
    contributors.forEach(async (userID) => {
      const user = await User.findById(userID);
      if (user) {
        user.projects = user.projects.filter((item) => console.log(item));
        user.save();
      }
    });
    const post = await Post.findById(req.params.id);
    post.users = post.users.filter((item) => contributors.indexOf(item) < 0);
    post.save();
    res.status(200).json({ status: 'success', data: post });
  } catch (error) {
    res.status(400).json({ status: 'fail', error: error.message });
  }
};

const deletePost = (req, res) => {
  Post.findByIdAndDelete(req.params.id)
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
  getAllPosts,
  getOnePost,
  createPost,
  addContributor,
  deleteContributor,
  updatePost,
  deletePost,
};
