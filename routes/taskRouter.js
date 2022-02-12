const {Router} = require('express');
const TaskController = require('../controllers/task.controller');
const { checkTask } = require('../middlewares/checkTask.mw');
const { checkUser } = require('../middlewares/checkUser.mw');

const taskRouter = Router();

taskRouter.post('/:userId', checkUser, TaskController.createTask);
taskRouter.get('/:userId/', checkUser, TaskController.getUserTasks);
taskRouter.patch('/:taskId/', checkTask, TaskController.updateUserTask );
taskRouter.delete('/:taskId', checkTask, TaskController.deleteTaskByPk);

module.exports = taskRouter;