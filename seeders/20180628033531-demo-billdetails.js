'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    var billDetails = [
      {
        billId: 2,
        itemId: 3,
        count: 1,
        price: 123000,
        img: "/img/demo.png", width: "240", height: "120",
        createdAt: '2018-02-27 02:05:16+07',
        updatedAt: Sequelize.literal('NOW()')
      },
      {
        billId: 2,
        itemId: 3,
        count: 1,
        price: 123000,
        img: "/img/demo.png", width: "240", height: "120",
        createdAt: '2018-03-27 02:05:16+07',
        updatedAt: Sequelize.literal('NOW()')
      },
      {
        billId: 2,
        itemId: 4,
        count: 1,
        price: 123000,
        img: "/img/demo.png", width: "240", height: "120",
        createdAt: '2018-05-27 02:05:16+07',
        updatedAt: Sequelize.literal('NOW()')
      },
      {
        billId: 2,
        itemId: 5,
        count: 1,
        price: 123000,
        img: "/img/demo.png", width: "240", height: "120",
        createdAt: '2018-04-27 02:05:16+07',
        updatedAt: Sequelize.literal('NOW()')
      },
      {
        billId: 2,
        itemId: 6,
        count: 1,
        price: 123000,
        img: "/img/demo.png", width: "240", height: "120",
        createdAt: '2018-04-23 02:05:16+07',
        updatedAt: Sequelize.literal('NOW()')
      },
      {
        billId: 2,
        itemId: 7,
        count: 1,
        price: 123000,
        img: "/img/demo.png", width: "240", height: "120",
        createdAt: '2018-06-27 02:05:16+07',
        updatedAt: Sequelize.literal('NOW()')
      },
      {
        billId: 2,
        itemId: 8,
        count: 1,
        price: 123000,
        img: "/img/demo.png", width: "240", height: "120",
        createdAt: '2018-02-15 02:05:16+07',
        updatedAt: Sequelize.literal('NOW()')
      },
      {
        billId: 2,
        itemId: 9,
        count: 1,
        price: 123000,
        img: "/img/demo.png", width: "240", height: "120",
        createdAt: '2018-03-30 02:05:16+07',
        updatedAt: Sequelize.literal('NOW()')
      },
      {
        billId: 2,
        itemId: 10,
        count: 1,
        price: 123000,
        img: "/img/demo.png", width: "240", height: "120",
        createdAt: '2018-04-22 02:05:16+07',
        updatedAt: Sequelize.literal('NOW()')
      },
      {
        billId: 2,
        itemId: 11,
        count: 1,
        price: 123000,
        img: "/img/demo.png", width: "240", height: "120",
        createdAt: '2018-02-25 02:05:16+07',
        updatedAt: Sequelize.literal('NOW()')
      },
      {
        billId: 2,
        itemId: 12,
        count: 1,
        price: 123000,
        img: "/img/demo.png", width: "240", height: "120",
        createdAt: '2018-04-01 02:05:16+07',
        updatedAt: Sequelize.literal('NOW()')
      },
      {
        billId: 2,
        itemId: 13,
        count: 1,
        price: 123000,
        img: "/img/demo.png", width: "240", height: "120",
        createdAt: '2018-03-22 02:05:16+07',
        updatedAt: Sequelize.literal('NOW()')
      },
      {
        billId: 2,
        itemId: 14,
        count: 1,
        price: 123000,
        img: "/img/demo.png", width: "240", height: "120",
        createdAt: '2018-02-15 02:05:16+07',
        updatedAt: Sequelize.literal('NOW()')
      },
      {
        billId: 2,
        itemId: 15,
        count: 1,
        price: 123000,
        img: "/img/demo.png", width: "240", height: "120",
        createdAt: '2018-06-16 02:05:16+07',
        updatedAt: Sequelize.literal('NOW()')
      },
      {
        billId: 2,
        itemId: 16,
        count: 1,
        price: 123000,
        img: "/img/demo.png", width: "240", height: "120",
        createdAt: '2018-02-23 02:05:16+07',
        updatedAt: Sequelize.literal('NOW()')
      },
      {
        billId: 2,
        itemId: 16,
        count: 1,
        price: 123000,
        img: "/img/demo.png", width: "240", height: "120",
        createdAt: '2018-02-23 02:05:16+07',
        updatedAt: Sequelize.literal('NOW()')
      },
      {
        billId: 2,
        itemId: 17,
        count: 1,
        price: 123000,
        img: "/img/demo.png", width: "240", height: "120",
        createdAt: '2018-02-23 02:05:16+07',
        updatedAt: Sequelize.literal('NOW()')
      },
      {
        billId: 2,
        itemId: 18,
        count: 1,
        price: 123000,
        img: "/img/demo.png", width: "240", height: "120",
        createdAt: '2018-02-23 02:05:16+07',
        updatedAt: Sequelize.literal('NOW()')
      },
      {
        billId: 2,
        itemId: 19,
        count: 1,
        price: 123000,
        img: "/img/demo.png", width: "240", height: "120",
        createdAt: '2018-04-23 02:05:16+07',
        updatedAt: Sequelize.literal('NOW()')
      },
      {
        billId: 2,
        itemId: 20,
        count: 1,
        price: 123000,
        img: "/img/demo.png", width: "240", height: "120",
        createdAt: '2018-02-18 02:05:16+07',
        updatedAt: Sequelize.literal('NOW()')
      },
      {
        billId: 2,
        itemId: 21,
        count: 1,
        price: 123000,
        img: "/img/demo.png", width: "240", height: "120",
        createdAt: '2018-02-22 02:05:16+07',
        updatedAt: Sequelize.literal('NOW()')
      },
      {
        billId: 2,
        itemId: 22,
        count: 1,
        price: 123000,
        img: "/img/demo.png", width: "240", height: "120",
        createdAt: '2018-05-23 02:05:16+07',
        updatedAt: Sequelize.literal('NOW()')
      },
      {
        billId: 2,
        itemId: 23,
        count: 1,
        price: 123000,
        img: "/img/demo.png", width: "240", height: "120",
        createdAt: '2018-03-23 02:05:16+07',
        updatedAt: Sequelize.literal('NOW()')
      },
      {
        billId: 2,
        itemId: 24,
        count: 1,
        price: 123000,
        img: "/img/demo.png", width: "240", height: "120",
        createdAt: '2018-03-23 02:05:16+07',
        updatedAt: Sequelize.literal('NOW()')
      },
      {
        billId: 2,
        itemId: 25,
        count: 1,
        price: 123000,
        img: "/img/demo.png", width: "240", height: "120",
        createdAt: '2018-02-21 02:05:16+07',
        updatedAt: Sequelize.literal('NOW()')
      },{
        billId: 2,
        itemId: 26,
        count: 1,
        price: 123000,
        img: "/img/demo.png", width: "240", height: "120",
        createdAt: '2018-02-23 02:05:16+07',
        updatedAt: Sequelize.literal('NOW()')
      },
      {
        billId: 2,
        itemId: 27,
        count: 1,
        price: 123000,
        img: "/img/demo.png", width: "240", height: "120",
        createdAt: '2018-02-23 02:05:16+07',
        updatedAt: Sequelize.literal('NOW()')
      },
      {
        billId: 2,
        itemId: 28,
        count: 1,
        price: 123000,
        img: "/img/demo.png", width: "240", height: "120",
        createdAt: '2018-04-23 02:05:16+07',
        updatedAt: Sequelize.literal('NOW()')
      },
      {
        billId: 2,
        itemId: 29,
        count: 1,
        price: 123000,
        img: "/img/demo.png", width: "240", height: "120",
        createdAt: '2018-02-18 02:05:16+07',
        updatedAt: Sequelize.literal('NOW()')
      },
      {
        billId: 2,
        itemId: 30,
        count: 1,
        price: 123000,
        img: "/img/demo.png", width: "240", height: "120",
        createdAt: '2018-02-22 02:05:16+07',
        updatedAt: Sequelize.literal('NOW()')
      },
      {
        billId: 2,
        itemId: 31,
        count: 1,
        price: 123000,
        img: "/img/demo.png", width: "240", height: "120",
        createdAt: '2018-05-23 02:05:16+07',
        updatedAt: Sequelize.literal('NOW()')
      },
      {
        billId: 2,
        itemId: 32,
        count: 1,
        price: 123000,
        img: "/img/demo.png", width: "240", height: "120",
        createdAt: '2018-03-23 02:05:16+07',
        updatedAt: Sequelize.literal('NOW()')
      },
      {
        billId: 2,
        itemId: 33,
        count: 1,
        price: 123000,
        img: "/img/demo.png", width: "240", height: "120",
        createdAt: '2018-03-23 02:05:16+07',
        updatedAt: Sequelize.literal('NOW()')
      },
      {
        billId: 2,
        itemId: 34,
        count: 1,
        price: 123000,
        img: "/img/demo.png", width: "240", height: "120",
        createdAt: '2018-02-21 02:05:16+07',
        updatedAt: Sequelize.literal('NOW()')
      },{
        billId: 2,
        itemId: 35,
        count: 1,
        price: 123000,
        img: "/img/demo.png", width: "240", height: "120",
        createdAt: '2018-02-23 02:05:16+07',
        updatedAt: Sequelize.literal('NOW()')
      },
      {
        billId: 2,
        itemId: 36,
        count: 1,
        price: 123000,
        img: "/img/demo.png", width: "240", height: "120",
        createdAt: '2018-02-23 02:05:16+07',
        updatedAt: Sequelize.literal('NOW()')
      },
      {
        billId: 2,
        itemId: 36,
        count: 1,
        price: 123000,
        img: "/img/demo.png", width: "240", height: "120",
        createdAt: '2018-04-23 02:05:16+07',
        updatedAt: Sequelize.literal('NOW()')
      },
      {
        billId: 2,
        itemId: 37,
        count: 1,
        price: 123000,
        img: "/img/demo.png", width: "240", height: "120",
        createdAt: '2018-02-18 02:05:16+07',
        updatedAt: Sequelize.literal('NOW()')
      },
      {
        billId: 2,
        itemId: 38,
        count: 1,
        price: 123000,
        img: "/img/demo.png", width: "240", height: "120",
        createdAt: '2018-02-22 02:05:16+07',
        updatedAt: Sequelize.literal('NOW()')
      },
      {
        billId: 2,
        itemId: 39,
        count: 1,
        price: 123000,
        img: "/img/demo.png", width: "240", height: "120",
        createdAt: '2018-05-23 02:05:16+07',
        updatedAt: Sequelize.literal('NOW()')
      },
      {
        billId: 2,
        itemId: 40,
        count: 1,
        price: 123000,
        img: "/img/demo.png", width: "240", height: "120",
        createdAt: '2018-03-23 02:05:16+07',
        updatedAt: Sequelize.literal('NOW()')
      },
      {
        billId: 2,
        itemId: 41,
        count: 1,
        price: 123000,
        img: "/img/demo.png", width: "240", height: "120",
        createdAt: '2018-03-23 02:05:16+07',
        updatedAt: Sequelize.literal('NOW()')
      },
      {
        billId: 2,
        itemId: 42,
        count: 1,
        price: 123000,
        img: "/img/demo.png", width: "240", height: "120",
        createdAt: '2018-02-21 02:05:16+07',
        updatedAt: Sequelize.literal('NOW()')
      },{
        billId: 2,
        itemId: 43,
        count: 1,
        price: 123000,
        img: "/img/demo.png", width: "240", height: "120",
        createdAt: '2018-02-23 02:05:16+07',
        updatedAt: Sequelize.literal('NOW()')
      },
      {
        billId: 2,
        itemId: 43,
        count: 1,
        price: 123000,
        img: "/img/demo.png", width: "240", height: "120",
        createdAt: '2018-02-21 02:05:16+07',
        updatedAt: Sequelize.literal('NOW()')
      },{
        billId: 2,
        itemId: 44,
        count: 1,
        price: 123000,
        img: "/img/demo.png", width: "240", height: "120",
        createdAt: '2018-02-23 02:05:16+07',
        updatedAt: Sequelize.literal('NOW()')
      }
    ];
    return queryInterface.bulkInsert('BillDetails', billDetails, {});
  },

  down: (queryInterface, Sequelize) => { 
      return queryInterface.bulkDelete('BillDetails', null, {});
  }
};
