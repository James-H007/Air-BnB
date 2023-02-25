'use strict';

const { query } = require('express');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'Reviews';
    return queryInterface.bulkInsert(options, [
      {
        id: 1,
        spotId: 1,
        userId: 1,
        review: "It was mid.",
        stars: 4,
        // createdAt: new Date('2023-02-01T00:00:00'),
        // updatedAt: new Date('2023-03-01T00:00:00')
      },
      {
        id: 2,
        spotId: 2,
        userId: 2,
        review: "I got punched by some psychic person. Don't go here",
        stars: 1,
        // createdAt: new Date('2023-02-01T00:00:00'),
        // updatedAt: new Date('2023-03-01T00:00:00')
      },
      {
        id: 3,
        spotId: 3,
        userId: 3,
        review: "Turns out they did scam me. Good icebreaker story though.",
        stars: 2,
        // createdAt: new Date('2023-02-01T00:00:00'),
        // updatedAt: new Date('2023-03-01T00:00:00')
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Reviews';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      stars: {[Op.in]: [4]}
    }, {});
  }
};
