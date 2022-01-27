const {Router} = require('express');
const groupRouter = require('./groupRouter');
const taskRouter = require('./taskRouter');
const userRouter = require('./userRouter');

const router = Router();

router.use('/users', userRouter);
router.use('/tasks', taskRouter);
router.use('/groups', groupRouter);


module.exports = router;