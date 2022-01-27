const {Group, User} = require ('../models');
const createError = require('http-error');
const _ = require('lodash');

module.exports.createGroupByUser = async (req, res, next ) => {
  try{
    const {body} = req;
    const values = _.pick(body, ['name','imagePath', 'description']);
    const user = await User.findByPk(body.userId);
    if(!user){
      return next(createError(404, 'User not found'));
    };
    const group = await Group.create({
      ...values
    });
    await group.addUser(user);
    
    res.status(200).send({data:group});
    next();
  }catch(err){
    next(err);
  }
}