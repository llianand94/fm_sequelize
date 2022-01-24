'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('tasks', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        field: 'user_id',
        allowNull: false,
        type: Sequelize.INTEGER,
        references:{
          model:{
            tableName: 'users'
          },
          key: 'id'
        },
        onUpdate: 'restrict',
        onDelete: 'cascade'
      },
      body: {
        allowNull: false,
        type: Sequelize.TEXT
      },
      isDone: {
        allowNull: false,
        field: 'is_done',
        defaultValue: false,
        type: Sequelize.BOOLEAN
      },
      deadLine: {
        field: 'dead_line',
        type: Sequelize.DATE
      },
      createdAt: {
        field: 'created_at',
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        field: 'updated_at',
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('tasks');
  }
};