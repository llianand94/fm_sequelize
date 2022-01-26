const {Router} = require('express');
const taskRouter = require('./taskRouter');
const userRouter = require('./userRouter');

const router = Router();

router.use('/users', userRouter);
router.use('/tasks', taskRouter);


module.exports = router;