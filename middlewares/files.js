const multer = require('multer');
const { v4: uuidv4 } = require('uuid');

uuidv4();
const DIR = './public/';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, DIR);
  }, //file 을 받아와서 DIR 경로에 저장한다.
  filename: (req, file, cb) => {
    // 저장할 파일의 이름을 설정한다.
    const fileName = file.originalname.toLowerCase().split(' ').join('-');
    cb(null, `${uuidv4()}-${fileName}`);
    // (uuidv4 O) 7c7c98c7-1d46-4305-ba3c-f2dc305e16b0-통지서
    // (uuidv4 X) 통지서
  },
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    // 말 그대로 fileFilter
    if (
      file.mimetype == 'image/png' ||
      file.mimetype == 'image/jpg' ||
      file.mimetype == 'image/jpeg'
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error('Only .png .jpg and .jpeg format allowed!'));
    }
  },
});

module.exports = { upload };
