const {Group} = require ('../models');
const _ = require('lodash');

module.exports.createGroupByUser = async (req, res, next ) => {
  try{
    const {body} = req;
    const values = _.pick(body, ['name','imagePath', 'description']);
    
    const group = await Group.create({
      ...values
    });

    
    res.status(200).send({data:group});
    next();
  }catch(err){
    next(err);
  }
}