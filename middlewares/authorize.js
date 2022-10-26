const User = require('../models/User');

const authorize = (req, res, next) => {
  //인증 처리를 할 것임
  //클라이언트 쿠키에서 토큰을 가져온다.
  const token = req.cookies.x_auth;
  //토큰을 복호화 한 후 유저를 찾는다.
  User.findByToken(token, (err, user) => {
    if (err) throw err;
    if (!user) return res.status(403).json({ isAuth: false, error: true });
    req.token = token;
    req.user = user;
    next(); //미들웨어에서 벗어날 수 있게한다.
  });
};

module.exports = { authorize };