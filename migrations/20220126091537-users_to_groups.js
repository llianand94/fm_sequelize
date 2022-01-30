'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('users_to_groups', { 
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    userId:{
      field:'user_id',
      allowNull: false,
      type: Sequelize.INTEGER,referenses:{
        model: 'users',
        key : 'id'
      },
      onUpdate:'cascade',
      onDelete:'cascade'
    },
    groupId:{
      field:'group_id',
      allowNull: false,
      type: Sequelize.INTEGER,referenses:{
        model: 'group',
        key : 'id'
      },
      onUpdate:'cascade',
      onDelete:'cascade'
    }
  });
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('users_to_groups');
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
