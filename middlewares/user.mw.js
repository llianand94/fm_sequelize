const {User} = require('../models');

module.exports.checkUser = async (req,res,next)=>{
  try{
    const {params:{id}} = req;
    const userInstance = await User.findByPk(id);
    if(!userInstance){
      throw new Error('User by id '+ id + ' was not found');
    }
    // console.log(userInstance);
    req.userInstance = userInstance;
    next(); 
  }catch(err){
    next(err);
  }
}