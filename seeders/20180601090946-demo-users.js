'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    var users = [
      {
        fullName: "Vũ Văn Đức",
        email: "vvduc@gmail.com",
        password: "$2a$08$eGqa52587nmsBj4AWJcgkOHQ8zOOHoCIOBbjH47dGFO5LJEL42CyK",
        address: "12 Lý Tự Trọng, Phường Lộc Thọ, TP. Nha Trang, tỉnh Khánh Hòa",
        phoneNum:"01234559876",
        status: true,
        createdAt: Sequelize.literal('NOW()'),
        updatedAt: Sequelize.literal('NOW()')
      },
      {
        fullName: "Châu Văn Điền",
        email: "cvdien@gmail.com",
        password: "$2a$08$eGqa52587nmsBj4AWJcgkOHQ8zOOHoCIOBbjH47dGFO5LJEL42CyK",
        address: "13 Trần Phú, Phường Lộc Thọ, TP. Bến Tre, tỉnh Bến Tre",
        phoneNum:"012345523436",
        status: true,
        createdAt: Sequelize.literal('NOW()'),
        updatedAt: Sequelize.literal('NOW()')
      },
      {
        fullName: "Cao Xuân Bắc",
        email: "cxbac@gmail.com",
        password: "$2a$08$eGqa52587nmsBj4AWJcgkOHQ8zOOHoCIOBbjH47dGFO5LJEL42CyK",
        address: "120 Trần Quang Khải, Phường 4, Quận 4, TP. Hồ Chí Minh",
        phoneNum:"0123133876",
        status: true,
        createdAt: Sequelize.literal('NOW()'),
        updatedAt: Sequelize.literal('NOW()')
      },
      {
        fullName: "Phạm Công Danh",
        email: "pcdanh@gmail.com",
        password: "$2a$08$eGqa52587nmsBj4AWJcgkOHQ8zOOHoCIOBbjH47dGFO5LJEL42CyK",
        address: "135B Trần Hưng Đạo, Quận 1, TP. Hồ Chí Minh",
        phoneNum:"01234559876",
        status: true,
        createdAt: Sequelize.literal('NOW()'),
        updatedAt: Sequelize.literal('NOW()')
      },
      {
        fullName: "Huỳnh Quang Huy",
        email: "hqhuy@gmail.com",
        password: "$2a$08$eGqa52587nmsBj4AWJcgkOHQ8zOOHoCIOBbjH47dGFO5LJEL42CyK",
        address: "120B Lê Lợi, Quận 8, TP. Hồ Chí Minh",
        phoneNum:"01234432123",
        status: true,
        createdAt: Sequelize.literal('NOW()'),
        updatedAt: Sequelize.literal('NOW()')
      }
    ];
    return queryInterface.bulkInsert('Users', users, {});
  },

  down: (queryInterface, Sequelize) => { 
      return queryInterface.bulkDelete('Users', users, {});
  }
};
