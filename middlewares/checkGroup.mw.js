const createError = require("http-errors");
const { Group } = require("../models");

module.exports.checkGroup = async (req, res, next) => {
  try {
    const { params: { groupId } } = req;
    const groupInstance = await Group.findByPk(groupId);
    if (!groupInstance) {
      return next(
        createError(404, "Group by id  " + groupId + " was not found")
      );
    }
    req.groupInstance = groupInstance;
    next();
  } catch (err) {
    next(err);
  }
};
