
const express = require('express');
const mongoose = require('mongoose');
//const { upload } = require('./middlewares/files');

const cookieParser = require('cookie-parser');

require('dotenv').config();

const app = express();

app.use(express.json());
app.use(cookieParser());

const userRouter = require('./routes/user');
const postRouter = require('./routes/post');

//app.use(upload.array());
app.use('/public', express.static('public'));
app.use('/users', userRouter);
app.use('/posts', postRouter);


mongoose
  .connect(process.env.MONGO_URI, {

    useNewUrlParser: true,
  })
  .then(() => console.log('Connected to mongodb'))
  .catch(() => console.log('mongodb connection failed'));

app.listen(8000, () => {
  console.log(`Server listening on port ${8000}`);
});
