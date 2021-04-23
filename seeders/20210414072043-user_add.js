'use strict';
const UUID = require('uuid').v4

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    return queryInterface.bulkInsert('users', [{
      username: 'John Doe',
      sex: 'man',
      id: UUID(),
      isDelete: false,
      createdAt: '2020-06-09 11:56:21',
      updatedAt: '2020-06-09 11:56:21'
    }], {});

  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.removeColumn('pv_user', 'algo_permission')
  }
};
