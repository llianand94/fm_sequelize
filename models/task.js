'use strict';
const {
  Model
} = require('sequelize');
const user = require('./user');
module.exports = (sequelize, DataTypes) => {
  class Task extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Task.belongsTo(models.User,{
        foreignKey: 'userId'
      })
      // define association here
    }
  }
  Task.init({
    body: {
      type:DataTypes.TEXT,
      allowNull:false,
      validate:{
        notNull:true,
        notEmpty: true
      }
    },
    isDone: {
      field:'is_done',
      type:DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull:false,
      validate:{
        notNull:true,
      }
    },
    deadLine: {
      field:'dead_line',
      type:DataTypes.DATE,
      validate:{
        isDate:true
      }
      }
  }, {
    sequelize,
    modelName: 'Task',
    tableName: 'tasks',
    underscored: true
  });
  return Task;
};