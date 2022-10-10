const Post = require('../models/Post');

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
  console.log(url);
  let post;
  if (req.files) {
    let urlArr = new Array();
    for (let i = 0; i < req.files.length; i++) {
      urlArr.push(`${url}/public/${req.files[i].filename}`);
      console.log(urlArr[i]);
    }
    post = new Post({
      title: req.body.title,
      body: req.body.body,
      tags: req.body.tags,
      mainimage: urlArr[0],
      images: urlArr, 
    });
  } else {
    post = new Post({
      title: req.body.title,
      body: req.body.body,
      tags: req.body.tags,
    });
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
  Post.findOneAndUpdate({ _id: req.params.id }, req.body)
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
  updatePost,
  deletePost,
};
