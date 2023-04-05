'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    options.tableName = 'Spots';
    return queryInterface.bulkInsert(options, [
      {
        // id: 1,
        ownerId: 1,
        address: "8823 Hack Street",
        city: "Watson",
        state: "California",
        country: "USA",
        lat: 2.2,
        lng: 1.1,
        name: "Corpo's Zen Palace",
        description: "Cozy and relaxing. Good vibes only.",
        price: 900.99,
        // createdAt: new Date('2023-02-01T00:00:00'),
        // updatedAt: new Date('2023-03-01T00:00:00')
      },
      {
        // id: 2,
        ownerId: 2,
        address: "9999 Aurora Street",
        city: "Westbrook",
        state: "Texas",
        country: "USA",
        lat: 2.2,
        lng: 1.1,
        name: "North Oak Estate",
        description: "Luxurious and a beautiful view",
        price: 1000.99,
        // createdAt: new Date('2023-02-01T00:00:00'),
        // updatedAt: new Date('2023-03-01T00:00:00')
      },
      {
        // id: 3,
        ownerId: 3,
        address: "7212 Shrapnel Court",
        city: "Heywood",
        state: "California",
        country: "USA",
        lat: 2.2,
        lng: 1.1,
        name: "Street's Hideout",
        description: "Chill vibes only.",
        price: 300.99,
        // createdAt: new Date('2023-02-01T00:00:00'),
        // updatedAt: new Date('2023-03-01T00:00:00')
      },
      {
        ownerId: 3,
        address: "1111 Wraith Lane",
        city: "Badlands",
        state: "California",
        lat: 2.2,
        lng: 1.1,
        name: "Not Wraith's Quarters",
        description: "We are not a SCAM",
        price: 150.00
      },
      {
        ownerId: 2,
        address: "8882 High End Estate",
        city: "City Center",
        state: "Washington",
        lat: 2.2,
        lng: 1.1,
        name: "Luxury Deluxe",
        description: "The prices may seem high. But it's well worth it.",
        price: 2000.00
      }
    ], {});

  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'Spots';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {}, {});
  }
};
