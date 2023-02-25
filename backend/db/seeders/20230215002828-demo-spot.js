'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'Spots';
    return queryInterface.bulkInsert(options, [
      {
        // id: 1,
        ownerId: 1,
        address: "123 Sesame Street",
        city: "Muppetropolis",
        state: "California",
        country: "USA",
        lat: 2.2,
        lng: 1.1,
        name: "Kermit's Place",
        description: "Cozy and green",
        price: 900.99,
        // createdAt: new Date('2023-02-01T00:00:00'),
        // updatedAt: new Date('2023-03-01T00:00:00')
      },
      {
        // id: 2,
        ownerId: 2,
        address: "Jojoland 8282",
        city: "Honolulu",
        state: "Hawaii",
        country: "USA",
        lat: 2.2,
        lng: 1.1,
        name: "New Land City",
        description: "Give us your money",
        price: 1000.99,
        // createdAt: new Date('2023-02-01T00:00:00'),
        // updatedAt: new Date('2023-03-01T00:00:00')
      },
      {
        // id: 3,
        ownerId: 3,
        address: "Gloomhave 1111",
        city: "Honolulu",
        state: "Hawaii",
        country: "USA",
        lat: 2.2,
        lng: 1.1,
        name: "Sunset Vally",
        description: "Give us your money and we won't refund you",
        price: 1000.99,
        // createdAt: new Date('2023-02-01T00:00:00'),
        // updatedAt: new Date('2023-03-01T00:00:00')
      }
    ], {});

  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Spots';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {}, {});
  }
};
