const {User} = require('../models');

module.exports.checkUser = async (req,res,next)=>{
  try{
    const {params:{userId}} = req;
    const userInstance = await User.findByPk(userId);
    if(!userInstance){
      throw new Error('User by id '+ userId + ' was not found');
    }
    // console.log(userInstance);
    req.userInstance = userInstance;
    next(); 
  }catch(err){
    next(err);
  }
}