const {Router} = require('express');
const multer = require('multer');
const path = require('path');
const GroupController = require('../controllers/group.controller');
const { checkUser } = require('../middlewares/user.mw');
const { checkGroup } = require('../middlewares/group.mw');


const groupRouter = Router();

// const upload = multer({
//   dest: path.resolve(__dirname, '../public/images')});

const storage = multer.diskStorage({
  destination:  (req, file, cb) =>{
    cb(null, path.resolve(__dirname, '../public/images'))
  },
  filename: (req, file, cb) => { 
    cb(null, Date.now()+ '-' +  file.originalname  )
  }
})

const upload = multer({ storage });

groupRouter.get('/:userId', GroupController.getUsersGroup);

groupRouter.post('/', GroupController.createGroupByUser);
groupRouter.post('/:groupId/image', upload.single('image'), GroupController.createGroupImage);
groupRouter.post('/:groupId', checkGroup, GroupController.addUserToGroup);

groupRouter.delete('/:groupId/users/:userId', checkUser, checkGroup,GroupController.deleteUserFromGroup);
groupRouter.patch('/:groupId', checkGroup, GroupController.updateGroup );

module.exports = groupRouter;