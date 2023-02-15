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
        id: 1,
        ownerId: 1,
        address: "123 Sesame Street",
        city: "Muppetropolis",
        state: "California",
        country: "USA",
        lat: 2.2,
        lng: 1.1,
        name: "Kermit's Place",
        description: "Cozy and green",
        price: 900.99
      }
    ], {});

  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Spots';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      address: { [Op.in]: ["123 Sesame Street"]}
    }, {});
  }
};
