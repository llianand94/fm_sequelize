const createError = require("http-errors");
const { User } = require("../models");

module.exports.checkUser = async (req, res, next) => {
  try {
    const { params: { userId } } = req;
    const userInstance = await User.findByPk(userId);
    if (!userInstance) {
      return next(createError(404, "User by id " + userId + " was not found"));
    }
    req.userInstance = userInstance;
    next();
  } catch (err) {
    next(err);
  }
};
