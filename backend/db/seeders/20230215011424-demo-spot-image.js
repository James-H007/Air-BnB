'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'SpotImages';
    return queryInterface.bulkInsert(options, [
      {
        id: 1,
        spotId: 1,
        url: "Amazing.url",
        preview: true,
        // createdAt: new Date('2023-02-01T00:00:00'),
        // updatedAt: new Date('2023-03-01T00:00:00')
      }
    ], {})
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'SpotImages';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      url: {[Op.in]: ["Amazing.url"]}
    }, {});
  }
};
