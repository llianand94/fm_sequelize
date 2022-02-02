const createError = require('http-errors');
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
    const {userInstance} = req;
    const getTasks = await userInstance.getTasks();
    if(!getTasks){
      return next(createError(404, "User have no tasks" ));
    };
    res.status(201).send({data:getTasks});
  }catch(err){
    next(err);
  }
}

module.exports.updateUserTask = async (req, res, next) => {
  try{
    const {body, params:{taskId}} = req;
    const [row,[updatedTask]] = await Task.update(body,{
      where : {id : taskId},
      returning: true
    });
    if(!updatedTask){
      return next(createError(404,"Task by id "+ taskId+ " not found"));
    };
    res.status(200).send({data:updatedTask});
}catch(err){
    next(err);
  }
}
module.exports.deleteTaskByPk = async (req, res,next) => {
  try{
    const {params:{taskId}} = req;
    const rows = await Task.destroy({
      where: {
        id:taskId
        }});    
    if(!rows){
      return next(createError(404, 'Task by id' + taskId + ' was not found'));
    };
    res.status(200).send({data:rows});
  }catch(err){
    next(err);
  }
}