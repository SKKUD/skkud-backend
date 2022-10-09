const mongoose = require('mongoose');

// schema
const postSchema = mongoose.Schema({

  title: { type: String, required: true },
  body: { type: String, required: true },
  author:{type:mongoose.Schema.Types.ObjectId, ref:'user'},
  createdAt: { type: Date, default: Date.now }, 
  updatedAt: { type: Date },
  attachment:{type:mongoose.Schema.Types.ObjectId, ref:'file'}, 

});

// model & export
const Post = mongoose.model('post', postSchema);
module.exports = Post;
