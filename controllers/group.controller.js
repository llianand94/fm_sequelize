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
};
module.exports.getUsersGroup = async (req,res,next) => {
  try{
    const {params:{userId}} = req;
    const userWithGroups = await User.findByPk(userId, {
      attributes:{
        exclude:"password"
      },
      include:[{
        model: Group,
        through :{
          attributes : []
        }
      }]
    });
    if(!userWithGroups){
      return next(createError(404, 'User not found'));
      }
    res.status(200).send({data:userWithGroups});  
  }catch(err){
    next(err);
  }
}
module.exports.createGroupImage = async (req,res,next) => {
  try{
    const {file:{filename}, params:{groupId}}= req;

    const [count, [updatedGroup]] = await Group.update({
      imagePath:filename
      },{
      where:{
        id:groupId
      },
      returning:true
    })
    res.status(200).send({data:updatedGroup});  
  }catch(err){
    next(err);
  }
}