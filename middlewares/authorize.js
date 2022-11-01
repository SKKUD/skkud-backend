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

const authorizeLevel2 = (req, res, next) => {
  const token = req.cookies.x_auth;
  //토큰을 복호화 한 후 유저를 찾는다.
  User.findByToken(token, (err, user) => {
    if (err) throw err;
    if (!user) return res.status(403).json({ isAuth: false, error: true });
    req.token = token;
    if (user.role === 'Level2' || user.role === 'Level3') {
      req.user = user;
      next(); //미들웨어에서 벗어날 수 있게한다.
    } else {
      res.status(403).json({
        status: 'fail',
        error: '해당 기능은 Level2 이상만 사용할 수 있습니다.',
      });
    }
  });
};

const authorizeLevel3 = (req, res, next) => {
  const token = req.cookies.x_auth;
  //토큰을 복호화 한 후 유저를 찾는다.
  User.findByToken(token, (err, user) => {
    if (err) throw err;
    if (!user) return res.status(403).json({ isAuth: false, error: true });
    req.token = token;
    if (user.role === 'Level3') {
      req.user = user;
      next(); //미들웨어에서 벗어날 수 있게한다.
    } else {
      res.status(403).json({
        status: 'fail',
        error: '해당 기능은 Level2 이상만 사용할 수 있습니다.',
      });
    }
  });
};

module.exports = { authorize, authorizeLevel2, authorizeLevel3 };
