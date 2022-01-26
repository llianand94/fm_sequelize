const {Router} = require('express');
const UserController = require('../controllers/user.controller');
const paginationMw = require('../middlewares/pagination.mw');
const { checkUser } = require('../middlewares/user.mw');

const userRouter = Router();

userRouter.post('/', UserController.createUser);
userRouter.get('/', paginationMw, UserController.getAllUsers);
userRouter.get('/:userId', UserController.getUser);
userRouter.patch('/:userId', UserController.updateUser);
userRouter.patch('/v2/:userId', checkUser, UserController.updateUserInstanse);
userRouter.delete('/:userId', checkUser, UserController.deleteUser);

module.exports = userRouter;

