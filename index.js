const express = require('express');
const mongoose = require('mongoose');

const cors = require('cors');
const cookieParser = require('cookie-parser');

require('dotenv').config();

const app = express();

const corsOptions = {
  origin:
    process.env.NODE_ENV === 'production'
      ? 'https://skku.dev'
      : 'http://localhost:3000',
  credentials: true,
};

app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));

const userRouter = require('./routes/user');
const postRouter = require('./routes/post');
const authRouter = require('./routes/auth');
const studyGroupRouter = require('./routes/study/studyGroup');
const studyRouter = require('./routes/study/study');
const applierRouter = require('./routes/apply/applier');
const appliedUserRouter = require('./routes/apply/appliedUser');

//app.use(upload.array());
app.use('/public', express.static('public'));
app.use('/users', userRouter);
app.use('/posts', postRouter);
app.use('/study/studyGroups', studyGroupRouter);
app.use('/study/studies', studyRouter);
app.use('/applies/appliers', applierRouter);
app.use('/applies/appliedUsers', appliedUserRouter);
app.use('/auth', authRouter);

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
  })
  .then(() => console.log('Connected to mongodb'))
  .catch(() => console.log('mongodb connection failed'));

app.listen(8000, () => {
  console.log(`Server listening on port ${8000}`);
});

module.exports = app;
