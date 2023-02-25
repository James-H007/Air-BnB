'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'Bookings';
    return queryInterface.bulkInsert(options, [
      {
        id: 1,
        spotId: 1,
        userId: 1,
        startDate: new Date(2023, 2, 1), //Remember we start at index 0
        endDate: new Date(2023, 5, 5),
        // createdAt: new Date('2023-02-01T00:00:00'),
        // updatedAt: new Date('2023-03-01T00:00:00')
      },
      {
        id: 2,
        spotId: 2,
        userId: 2,
        startDate: new Date(2023, 2, 1), //Remember we start at index 0
        endDate: new Date(2023, 5, 5),
        // createdAt: new Date('2023-02-01T00:00:00'),
        // updatedAt: new Date('2023-03-01T00:00:00')
      },
      {
        id: 3,
        spotId: 3,
        userId: 3,
        startDate: new Date(2023, 2, 1), //Remember we start at index 0
        endDate: new Date(2023, 5, 5),
        // createdAt: new Date('2023-02-01T00:00:00'),
        // updatedAt: new Date('2023-03-01T00:00:00')
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Bookings';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      id: {[Op.in]: [1]}
    }, {});
  }
};
