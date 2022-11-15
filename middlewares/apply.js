const { AppliedUser } = require('../models/apply/appliedUser');

const isThereAppliedUser = (req, res, next) => {
  AppliedUser.find().then((data) => {
    if (data.length > 0) {
      res.status(403).json({
        status: 'fail',
        error:
          '이미 지원한 유저가 있습니다. 지원자를 모두 삭제하고 지원 양식을 변경하세요.',
      });
    } else {
      next();
    }
  });
};

module.exports = { isThereAppliedUser };
