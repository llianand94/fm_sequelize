'use strict';
const {Model} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Group extends Model {
    static associate(models) {
      Group.belongsToMany(models.User,{
        through: 'users_to_groups',
        foreignKey : 'groupId'
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