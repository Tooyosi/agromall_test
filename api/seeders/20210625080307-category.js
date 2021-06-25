'use strict';

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

    return queryInterface.bulkInsert('categories', [{
      name: 'lifestock',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Fruits',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Grains',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Vegies',
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
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
