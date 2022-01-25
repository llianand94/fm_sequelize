'use strict';
const _ = require('lodash');
const { QueryTypes } = require("sequelize");
const { sequelize } = require('../models');


module.exports = {
  async up (queryInterface, Sequelize) {
    const users = await sequelize.query(`
    SELECT * FROM "users"`,{
      type: QueryTypes.SELECT
    });

    const tasks = users.map((u)=>{
      return new Array(_.random(3,7,false)).fill(null).map((task,i)=>({
        body:`text ${i} `,  
        user_id: i,
        created_at: new Date(),
        updated_at: new Date()      
      })).flat(2)
    })
    await queryInterface.bulkInsert('tasks', tasks, {});
    /**
     * Add seed commands here.
     *
     * Example:
     * 
    */
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('tasks', null, {})
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
