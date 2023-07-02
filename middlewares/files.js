const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const path = require('path');
const AWS = require('aws-sdk');
const multerS3 = require('multer-s3');

AWS.config.update({
  region: 'ap-northeast-2',
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

const s3 = new AWS.S3();

const upload = multer({
  storage: multerS3({
    s3,
    bucket: 'skkud.s3',
    key: (req, file, cb) => {
      const ext = path.extname(file.originalname);
      cb(null, path.basename(file.originalname, ext) + uuidv4() + ext);
    },
  }),
  acl: 'public-read-write',
  limits: { fileSize: 5 * 1024 * 1024 },
});

module.exports = { upload };
