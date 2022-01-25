const {Router} = require('express');
const UserController = require('./controllers/user.controller');
const TaskController = require('./controllers/task.controller');
const { checkUser } = require('./middlewares/user.mw');

const router = Router();
router.post('/user', UserController.createUser);
router.get('/users', UserController.getAllUsers);
router.patch('/user/:id', UserController.updateUser);
router.patch('/user/:id', checkUser, UserController.updateUserInstanse);
router.delete('/user/:id', checkUser, UserController.deleteUser);

router.post('/user/:id/task', checkUser, TaskController.createTask);
router.get('/user/:id/tasks', checkUser, TaskController.getUserTasks);

module.exports = router;