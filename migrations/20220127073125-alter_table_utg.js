'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {

    await queryInterface.addColumn(
     'users_to_groups',
     'created_at', {
       type:Sequelize.DATE,
       allowNull:false
      }, {
      after: 'dead_line' // after option is only supported by MySQL
   });
   await queryInterface.addColumn(
    'users_to_groups',
    'updated_at', {
      type:Sequelize.DATE,
      allowNull:false
     }, {
     after: 'created_at' // after option is only supported by MySQL
  });
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
  },

  async down (queryInterface, Sequelize) {    
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
