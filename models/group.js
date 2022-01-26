'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Group extends Model {
    
    static associate(models) {
      Grop.belongsToMany(models.User,{
        through: 'user_to_group',
        foreignKey : 'userId'
      });
      // define association here
    }
  }
  Group.init({
    name: {
      allowNull:false,
      type:DataTypes.STRING
    },
    imagePath: {
      field:'image_path',
      type:DataTypes.STRING
    },
    description: {
      type:DataTypes.TEXT
    }
  }, {
    sequelize,
    modelName: 'Group',
    tableName: 'groups',
    underscored: true
  });
  return Group;
};