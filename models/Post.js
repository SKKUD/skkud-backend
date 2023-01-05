const mongoose = require('mongoose');

// schema
const postSchema = mongoose.Schema({
  title: { type: String, required: true },
  body: { type: String, required: true },
  tags: [{ type: String }],
  link: { type: String, default: '없음' },
  developPeriod: {
    type: String,
    required: true,
  },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  users: { type: [mongoose.Schema.Types.ObjectId], default: [], ref: 'User' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date },
  mainimage: { type: String },
  images: [{ type: String }],
});

// model & export
const Post = mongoose.model('post', postSchema);
module.exports = Post;
