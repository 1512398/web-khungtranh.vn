'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    var bills = [
      {
        userId: 3,
        itemId: 1,
        date: '2018-06-27 02:05:16+07',
        status: 'Đã Thanh Toán',
        img: "",
        price: 120000,
        count: 3,
        address: '227 Nguyen Van Cu',
        tel: '352677642',
        typeDeli: 1,
        costDeli: 10000,
        priceFinal: 130000,
        createdAt: '2018-06-27 02:05:16+07',
        updatedAt: Sequelize.literal('NOW()')
      },
      {
        userId: 3,
        itemId: 1,
        date: '2018-06-28 02:05:16+07',
        status: 'Đã Thanh Toán',
        img: "",
        price: 120000,
        count: 3,
        address: '227 Nguyen Van Cu',
        tel: '352677642',
        typeDeli: 1,
        costDeli: 10000,
        priceFinal: 130000,
        createdAt: '2018-06-28 02:05:16+07',
        updatedAt: Sequelize.literal('NOW()')
      },
      {
        userId: 3,
        itemId: 1,
        date: '2018-06-30 02:05:16+07',
        status: 'Đã Thanh Toán',
        img: "",
        price: 120000,
        count: 3,
        address: '227 Nguyen Van Cu',
        tel: '352677642',
        typeDeli: 1,
        costDeli: 10000,
        priceFinal: 130000,
        createdAt: '2018-06-30 02:05:16+07',
        updatedAt: Sequelize.literal('NOW()')
      },
      {
        userId: 3,
        itemId: 1,
        date: '2018-06-15 02:05:16+07',
        status: 'Đã Thanh Toán',
        img: "",
        price: 120000,
        count: 3,
        address: '227 Nguyen Van Cu',
        tel: '352677642',
        typeDeli: 1,
        costDeli: 10000,
        priceFinal: 130000,
        createdAt: '2018-06-15 02:05:16+07',
        updatedAt: Sequelize.literal('NOW()')
      },
      {
        userId: 3,
        itemId: 1,
        date: '2018-05-27 02:05:16+07',
        status: 'Đã Thanh Toán',
        img: "",
        price: 120000,
        count: 3,
        address: '227 Nguyen Van Cu',
        tel: '352677642',
        typeDeli: 1,
        costDeli: 10000,
        priceFinal: 130000,
        createdAt: '2018-05-27 02:05:16+07',
        updatedAt: Sequelize.literal('NOW()')
      },
      {
        userId: 3,
        itemId: 1,
        date: '2018-05-28 02:05:16+07',
        status: 'Đã Thanh Toán',
        img: "",
        price: 120000,
        count: 3,
        address: '227 Nguyen Van Cu',
        tel: '352677642',
        typeDeli: 1,
        costDeli: 10000,
        priceFinal: 130000,
        createdAt: '2018-05-28 02:05:16+07',
        updatedAt: Sequelize.literal('NOW()')
      },
      {
        userId: 3,
        itemId: 1,
        date: '2018-05-13 02:05:16+07',
        status: 'Đã Thanh Toán',
        img: "",
        price: 120000,
        count: 3,
        address: '227 Nguyen Van Cu',
        tel: '352677642',
        typeDeli: 1,
        costDeli: 10000,
        priceFinal: 130000,
        createdAt: '2018-05-13 02:05:16+07',
        updatedAt: Sequelize.literal('NOW()')
      },
      {
        userId: 3,
        itemId: 1,
        date: '2018-04-27 02:05:16+07',
        status: 'Đã Thanh Toán',
        img: "",
        price: 120000,
        count: 3,
        address: '227 Nguyen Van Cu',
        tel: '352677642',
        typeDeli: 1,
        costDeli: 10000,
        priceFinal: 130000,
        createdAt: '2018-04-27 02:05:16+07',
        updatedAt: Sequelize.literal('NOW()')
      },
      {
        userId: 3,
        itemId: 1,
        date: '2018-04-27 02:05:16+07',
        status: 'Đã Thanh Toán',
        img: "",
        price: 120000,
        count: 3,
        address: '227 Nguyen Van Cu',
        tel: '352677642',
        typeDeli: 1,
        costDeli: 10000,
        priceFinal: 130000,
        createdAt: '2018-04-27 02:05:16+07',
        updatedAt: Sequelize.literal('NOW()')
      },
      {
        userId: 3,
        itemId: 1,
        date: '2018-04-27 02:05:16+07',
        status: 'Đã Thanh Toán',
        img: "",
        price: 120000,
        count: 3,
        address: '227 Nguyen Van Cu',
        tel: '352677642',
        typeDeli: 1,
        costDeli: 10000,
        priceFinal: 130000,
        createdAt: '2018-04-27 02:05:16+07',
        updatedAt: Sequelize.literal('NOW()')
      },
      {
        userId: 3,
        itemId: 1,
        date: '2018-03-27 02:05:16+07',
        status: 'Đã Thanh Toán',
        img: "",
        price: 120000,
        count: 3,
        address: '227 Nguyen Van Cu',
        tel: '352677642',
        typeDeli: 1,
        costDeli: 10000,
        priceFinal: 130000,
        createdAt: '2018-03-27 02:05:16+07',
        updatedAt: Sequelize.literal('NOW()')
      },
      {
        userId: 3,
        itemId: 1,
        date: '2018-02-27 02:05:16+07',
        status: 'Đã Thanh Toán',
        img: "",
        price: 120000,
        count: 3,
        address: '227 Nguyen Van Cu',
        tel: '352677642',
        typeDeli: 1,
        costDeli: 10000,
        priceFinal: 130000,
        createdAt: '2018-02-27 02:05:16+07',
        updatedAt: Sequelize.literal('NOW()')
      },
      {
        userId: 3,
        itemId: 1,
        date: '2018-02-27 02:05:16+07',
        status: 'Đã Thanh Toán',
        img: "",
        price: 120000,
        count: 3,
        address: '227 Nguyen Van Cu',
        tel: '352677642',
        typeDeli: 1,
        costDeli: 10000,
        priceFinal: 130000,
        createdAt: '2018-02-27 02:05:16+07',
        updatedAt: Sequelize.literal('NOW()')
      },
      {
        userId: 3,
        itemId: 1,
        date: '2018-03-27 02:05:16+07',
        status: 'Đã Thanh Toán',
        img: "",
        price: 120000,
        count: 3,
        address: '227 Nguyen Van Cu',
        tel: '352677642',
        typeDeli: 1,
        costDeli: 10000,
        priceFinal: 130000,
        createdAt: '2018-03-27 02:05:16+07',
        updatedAt: Sequelize.literal('NOW()')
      },
      {
        userId: 3,
        itemId: 1,
        date: '2018-04-16 02:05:16+07',
        status: 'Đã Thanh Toán',
        img: "",
        price: 120000,
        count: 3,
        address: '227 Nguyen Van Cu',
        tel: '352677642',
        typeDeli: 1,
        costDeli: 10000,
        priceFinal: 130000,
        createdAt: '2018-04-16 02:05:16+07',
        updatedAt: Sequelize.literal('NOW()')
      },
      {
        userId: 3,
        itemId: 1,
        date: '2018-04-12 02:05:16+07',
        status: 'Đã Thanh Toán',
        img: "",
        price: 120000,
        count: 3,
        address: '227 Nguyen Van Cu',
        tel: '352677642',
        typeDeli: 1,
        costDeli: 10000,
        priceFinal: 130000,
        createdAt: '2018-04-12 02:05:16+07',
        updatedAt: Sequelize.literal('NOW()')
      },
      {
        userId: 3,
        itemId: 1,
        date: '2018-04-21 02:05:16+07',
        status: 'Đã Thanh Toán',
        img: "",
        price: 120000,
        count: 3,
        address: '227 Nguyen Van Cu',
        tel: '352677642',
        typeDeli: 1,
        costDeli: 10000,
        priceFinal: 130000,
        createdAt: '2018-04-21 02:05:16+07',
        updatedAt: Sequelize.literal('NOW()')
      },
      {
        userId: 3,
        itemId: 1,
        date: '2018-02-20 02:05:16+07',
        status: 'Đã Thanh Toán',
        img: "",
        price: 120000,
        count: 3,
        address: '227 Nguyen Van Cu',
        tel: '352677642',
        typeDeli: 1,
        costDeli: 10000,
        priceFinal: 130000,
        createdAt: '2018-02-20 02:05:16+07',
        updatedAt: Sequelize.literal('NOW()')
      },
      {
        userId: 3,
        itemId: 1,
        date: '2018-02-11 02:05:16+07',
        status: 'Đã Thanh Toán',
        img: "",
        price: 120000,
        count: 3,
        address: '227 Nguyen Van Cu',
        tel: '352677642',
        typeDeli: 1,
        costDeli: 10000,
        priceFinal: 130000,
        createdAt: '2018-02-11 02:05:16+07',
        updatedAt: Sequelize.literal('NOW()')
      },
      {
        userId: 3,
        itemId: 1,
        date: '2018-02-10 02:05:16+07',
        status: 'Đã Thanh Toán',
        img: "",
        price: 120000,
        count: 3,
        address: '227 Nguyen Van Cu',
        tel: '352677642',
        typeDeli: 1,
        costDeli: 10000,
        priceFinal: 130000,
        createdAt: '2018-02-10 02:05:16+07',
        updatedAt: Sequelize.literal('NOW()')
      },
      {
        userId: 3,
        itemId: 1,
        date: '2018-03-08 02:05:16+07',
        status: 'Đã Thanh Toán',
        img: "",
        price: 120000,
        count: 3,
        address: '227 Nguyen Van Cu',
        tel: '352677642',
        typeDeli: 1,
        costDeli: 10000,
        priceFinal: 130000,
        createdAt: '2018-03-08 02:05:16+07',
        updatedAt: Sequelize.literal('NOW()')
      },
      
    ];
    return queryInterface.bulkInsert('Bills', bills, {});
  },

  down: (queryInterface, Sequelize) => { 
      return queryInterface.bulkDelete('Bills', null, {});
  }
};