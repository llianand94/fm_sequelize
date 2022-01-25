'use strict';

const generateUser = key =>({
  first_name: `Pew ${key+1}`,
  last_name: `Toy${key+1}`,
  email: `pewPew${key+2}@gmail.com`,
  password_hash: `pasdfad`,
  birthday: new Date(1980, key*10),
  is_male: Math.random()>0.5,
  created_at: new Date(),
  updated_at: new Date()
})

const generateUsers = (amount =40) =>{
  return new Array(amount).fill(null).map((empty, i)=>generateUser(i));
}
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('users', generateUsers(), {});
    /**
     * Add seed commands here.
     *
     * Example:
     * 
    */
  },

  async down (queryInterface, Sequelize) {
      await queryInterface.bulkDelete('users', null, {});
    /**
     * Add commands to revert seed here.
     *
     
     */
  }
};
