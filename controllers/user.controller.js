const createError = require('http-errors');
const {User} = require('../models');

module.exports.createUser =  async (req, res, next) =>{
  try {
    const {body} = req;
    const createdUser = await User.create(body);
    if(!createdUser){
      throw new Error('400. Bad Request');
    }
    res.status(201).send(createdUser);
  } catch (error) {
    next(error)
  }
}
module.exports.getUser = async (req,res,next)=>{
  try{
    const {params:{userId}} = req;
    const user = await User.findByPk(userId, {
      attributes:{
        exclude: ['password']
    }
    });
    if(!user){
      const error = createError(404, 'User Not Found');
      return next(error);
    }

    res.status(200).send({data:user})
  }catch(err){
    next(err);
  }
}

module.exports.getAllUsers = async (req,res, next) =>{
  try{
    const {pagination={}} = req;
    const results = await User.findAll(
      {        
      where: {
      // firstName: 'Pew'
    },
      attributes: {
         exclude : ['password']
        },
      ...pagination  
      });
    res.status(200).send({data:results});
  }catch(err){
    next(err);
  }
}
module.exports.updateUser = async (req,res, next) =>{
  try{
    const {body, params: {userId}} = req; 
    const [row,[updatedUser]] = await User.update(body,{
      where : {id : userId},
      returning: true
    });
    updatedUser.password = undefined;
    res.status(200).send({data:updatedUser});
  }catch(err){
    next(err);
  }
}

module.exports.updateUserInstanse = async (req,res, next) =>{
  try{
    const {body, userInstance} = req;    
    const updatedUser = await userInstance.update(body,
      {
        returning: true
    });
    updatedUser.password = undefined;
    res.status(200).send({data:updatedUser});
  }catch(err){
    next(err);
  }
}

module.exports.deleteUser = async (req, res, next) => {
  try{
    const {body,userInstance, params:{id}} = req;
    const deletedUser = await userInstance.destroy();
    res.status(200).send({data:deletedUser});
  }catch(err){
    next(err);
  }
}