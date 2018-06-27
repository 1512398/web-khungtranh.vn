'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    var admins = [
      {
        admin: 'admin',
        password: '1234',
        createdAt: Sequelize.literal('NOW()'),
        updatedAt: Sequelize.literal('NOW()')
      },
      {
        admin: 'hthieu',
        password: '1234',
        createdAt: Sequelize.literal('NOW()'),
        updatedAt: Sequelize.literal('NOW()')
      }
    ];
    return queryInterface.bulkInsert('Admins', admins, {});
  },

  down: (queryInterface, Sequelize) => { 
      return queryInterface.bulkDelete('Admins', null, {});
  }
};
