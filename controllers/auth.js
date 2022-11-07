const User = require('../models/User');

//로그인
const login = (req, res) => {
  //요청된 이메일을 데이터베이스에서 있는지 찾는다.
  User.findOne({ userID: req.body.userID }, (err, user) => {
    if (!user) {
      return res.status(401).json({
        loginSuccess: false,
        message: '제공된 이메일에 해당하는 유저가 없습니다.',
      });
    }
    //요청된 이메일이 데이터베이스에 있다면 비밀번호가 맞는지 확인한다.
    user.comparePassword(req.body.passwd, (err2, isMatch) => {
      if (String(isMatch) !== 'true') {
        return res.status(403).json({
          loginSuccess: false,
          message: '비밀번호가 틀렸습니다.',
        });
      }
      //비밀번호까지 맞다면 토큰을 생성한다.
      user.generateToken((err3, user2) => {
        if (err3) return res.status(400).send(err3);
        // token을 저장한다. 어디에? 쿠키에 할거임
        res
          .cookie('x_auth', user2.token)
          .status(200)
          .json({ loginSuccess: true, userID: user2.userID });
      });
    });
  });
};

const logout = (req, res) => {
  User.findOneAndUpdate({ userID: req.user.userID }, { token: '' }, (err) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).send({
      success: true,
    });
  });
};

const verify = (req, res) => {
  res.status(200).json({
    status: 'success',
    data: req.user,
  });
};

module.exports = {
  login,
  logout,
  verify,
};
