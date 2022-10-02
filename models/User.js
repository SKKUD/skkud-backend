const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// schema
const userSchema = mongoose.Schema({
  // 1
  userID: { type: String, required: true },
  username: { type: String, required: true },
  passwd: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }, // 2
  updatedAt: { type: Date },
  token: { type: String },
  tokenExp: { type: Number },
});

//middlewares
userSchema.pre('save', function (next) {
  const user = this;
  if (user.isModified('passwd')) {
    //비밀번호 암호화
    bcrypt.genSalt(parseInt(process.env.SALT_ROUNDS, 10), (err, salt) => {
      if (err) return next(err);
      bcrypt.hash(user.passwd, salt, (error, hashedPW) => {
        if (error) return next(error);
        user.passwd = hashedPW;
        next();
      });
    });
  } else {
    next();
  }
});

userSchema.methods.comparePassword = function (plainPassword, callback) {
  bcrypt.compare(plainPassword, this.passwd, (err, isMatch) => {
    if (err) return callback(err);
    return callback(null, isMatch);
  });
};

userSchema.methods.generateToken = function (callback) {
  const user = this;
  const token = jwt.sign(user._id.toHexString(), process.env.SECRET_TOKEN);
  user.token = token;
  user.save((err, matchedUser) => {
    if (err) return callback(err);
    return callback(null, matchedUser);
  });
};

userSchema.statics.findByToken = function (token, callback) {
  const user = this;
  jwt.verify(token, process.env.SECRET_TOKEN, (err, decoded) => {
    user.findOne({ userID: decoded, token: token }, (error, matchedUser) => {
      if (error) return callback(error);
      callback(null, matchedUser);
    });
  });
};

// model & export
const User = mongoose.model('user', userSchema);
module.exports = User;
