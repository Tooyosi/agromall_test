'use strict';

const { bin2hashData } = require("../helpers");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */

    return queryInterface.bulkInsert('users', [{
      firstname: "Test",
      lastname: "Test",
      email: 'test@theagromall.com',
      password: bin2hashData("password", process.env.PASSWORD_HASH),
      createdAt: new Date(),
      updatedAt: new Date()
    },]);
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  }
};
