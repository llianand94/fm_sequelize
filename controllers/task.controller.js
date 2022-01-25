const {Task} = require('../models');

module.exports.createTask = async (req,res,next)=>{
  try{
    const {body, userInstance} = req;
    const newTask = await userInstance.createTask(body);
   
    res.status(201).send({data:newTask});
  }catch(err){
    next(err);
  }
}

module.exports.getUserTasks = async (req,res,next)=>{
  try{
    const {body, userInstance} = req;
    const getTasks = await userInstance.getTasks(body);
   
    res.status(201).send({data:getTasks});
  }catch(err){
    next(err);
  }
}