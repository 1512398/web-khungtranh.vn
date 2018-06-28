'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    var catalogs = [
      {
        title: "Khung gỗ cổ điển",
        deleted:0,
        summary: "Khung với chất liệu gỗ sang trọng, tạo không khí ấm áp, hài hòa cho không gian trang trí",
        createdAt: Sequelize.literal('NOW()'),
        updatedAt: Sequelize.literal('NOW()')
      },
      {
        title: "Khung gỗ hiện đại",
        deleted:0,
        summary: "Khung với chất liệu gỗ sang trọng với thiết kế cách tân, phù hợp với các không gian trang trí hiện đại, sáng tạo",
        createdAt: Sequelize.literal('NOW()'),
        updatedAt: Sequelize.literal('NOW()')
      },
      {
        title: "Khung composite cổ điển",
        deleted:0,
        summary: "Khung với chất liệu composite chắc chắn, màu sắc sang trọng, hoa văn cách điệu độc đáo tạo không khí ấm áp, hài hòa cho không gian trang trí",
        createdAt: Sequelize.literal('NOW()'),
        updatedAt: Sequelize.literal('NOW()')
      },
      {
        title: "Khung composite hiện đại",
        deleted:0,
        summary: "Khung với chất liệu composite chắc chắn, phù hợp với các không gian trang trí hiện đại, sáng tạo",
        createdAt: Sequelize.literal('NOW()'),
        updatedAt: Sequelize.literal('NOW()')
      }
    ];
    return queryInterface.bulkInsert('Catalogs', catalogs, {});
  },

  down: (queryInterface, Sequelize) => { 
      return queryInterface.bulkDelete('Catalogs', null, {});
  }
};
