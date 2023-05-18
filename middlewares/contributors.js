const User = require('../models/User');

const contributorMiddleware = async (req, res, next) => {
  try {
    const propertyNames = [
      'initializeContributors',
      'addContributors',
      'deleteContributors',
    ];
    propertyNames.forEach((propertyName) => {
      const property = req.body[propertyName];
      if (!property) req.body[propertyName] = [];
      else if (!Array.isArray(property)) req.body[propertyName] = [property];
    });
    const userIDs = []
      .concat(
        req.body.initializeContributors,
        req.body.addContributors,
        req.body.deleteContributors
      )
      .filter((id, index, arr) => arr.indexOf(id) === index);
    const users = await User.find().where('_id').in(userIDs).lean();
    if (users.length !== userIDs.length) {
      return res.status(400).json({
        status: 'fail',
        error: 'contributors not found',
      });
    }
    next();
  } catch (error) {
    res.status(400).json({ status: 'fail', error: error.message });
  }
};

module.exports = { contributorMiddleware };
