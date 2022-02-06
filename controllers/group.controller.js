const createError = require('http-errors');
const _ = require('lodash');
const {Group, User} = require ('../models');

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
module.exports.getAllGroups = async (req, res, next) =>{
  try{
    const {pagination} = req;
    const groups = await Group.findAll({...pagination});
    if(!groups){
      return next(createError(404, 'Groups were not found'));
      }
    res.status(200).send({data:groups});
  }catch(error){
    next(error);
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
module.exports.addUserToGroup = async (req,res, next) =>{
  try{
    const {groupInstance, body:{userId},params:{groupId}} = req;
    
    const user = await User.findByPk(userId);
    if(!user){
      return next(createError(404, "User not found"));
    }
    await groupInstance.addUser(user);
    const groupWithUsers = await Group.findByPk(groupId, {
      include:[{
        model:User,
        attributes:{
          exclude: 'password'
        },
        through:{
          attributes:[]
        }
      }]
    });   
    res.status(201).send({data: groupWithUsers});
  }catch(err){
    next(err)
  };
}
module.exports.deleteUserFromGroup = async (req,res,next)=>{
  try{
    const {userInstance, groupInstance} = req;   
    const result = await groupInstance.removeUser(userInstance);
    if(!result){
      return next(createError(404, 'Group with this user was not found!'));
    };
    res.status(200).send({data:result});
  }catch(err){
    next(err);
  }
}
module.exports.updateGroup = async (req,res,next)=>{
  try{
    const {groupInstance, body} = req;
    const updatedGroup = await groupInstance.update(
      body
      ,{
        fields:["description","name"],
        returning:true
      });
    if(!updatedGroup){
      return next(createError(404, 'Could not update group'));
    };
    //if answer without body status(204)
    res.status(200).send({data:updatedGroup});
  }catch(error){
    next(error);
  }
}