const {Task} = require('../models');

module.exports.createTask = async (req,res,next)=>{
  try{
    const {body, params: {id}} = req;
    const newTask = await Task.create({...body, userId:id});
    res.status(201).send(newTask);
  }catch(err){
    next(err);
  }
}