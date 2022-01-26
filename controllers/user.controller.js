const {User} = require('../models');

module.exports.createUser =  async (req, res, next) =>{
  try {
    const {body} = req;
    const createdUser = await User.create(body);
    res.status(201).send(createdUser);
  } catch (error) {
    next(error)
  }
}
module.exports.getAllUsers = async (req,res, next) =>{
  try{
    const results = await User.findAll(
      {
      where: {
      // firstName: 'Pew'
    },
      attributes: {
         exclude : ['password']
        }});
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