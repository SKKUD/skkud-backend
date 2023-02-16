const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const path = require('path');

uuidv4();
const DIR = './uploads/';

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, cb) {
      cb(null, DIR);
    },
    filename(req, file, cb) {
      const ext = path.extname(file.originalname);
      console.log(ext);
      cb(null, path.basename(file.originalname, ext) + Date.now() + ext);
    },
  }),
  limits: { fileSize: 5 * 1024 * 1024 },
});

module.exports = { upload };
