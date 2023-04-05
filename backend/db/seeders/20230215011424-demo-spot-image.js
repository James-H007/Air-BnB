'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    options.tableName = 'SpotImages';
    return queryInterface.bulkInsert(options, [
      {
        // id: 1,
        spotId: 1,
        url: "https://i0.wp.com/goblinsandghouls.com/wp-content/uploads/2022/10/Cyberpunk-2077-Apartments-1.png?fit=1920%2C1080&ssl=1",
        preview: true,
        // createdAt: new Date('2023-02-01T00:00:00'),
        // updatedAt: new Date('2023-03-01T00:00:00')
      },
      {
        // id: 2,
        spotId: 2,
        url: "https://oyster.ignimgs.com/mediawiki/apis.ign.com/cyberpunk-2077/0/0d/23433302-4104-42D3-8F60-CDC69C5E911A.jpeg",
        preview: true,
        // createdAt: new Date('2023-02-01T00:00:00'),
        // updatedAt: new Date('2023-03-01T00:00:00')
      },
      {
        // id: 3,
        spotId: 3,
        url: "https://oyster.ignimgs.com/mediawiki/apis.ign.com/cyberpunk-2077/9/90/WCyberpunk311.png?width=640",
        preview: true,
        // createdAt: new Date('2023-02-01T00:00:00'),
        // updatedAt: new Date('2023-03-01T00:00:00')
      },
      {
        spotId: 4,
        url: "https://oyster.ignimgs.com/mediawiki/apis.ign.com/cyberpunk-2077/a/a8/CP2077_Ripperdoc_BadlandLocation.png",
        preview: true
      },
      {
        spotId: 5,
        url: "https://cdn.gfinityesports.com/images/ncavvykf/gfinityesports/67d6671daa1e4f7fdd5b0e415bc9df8ea9ad96ee-1480x742.jpg?rect=81,0,1318,742&w=700&h=394",
        preview: true
      }
    ], {})
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'SpotImages';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      url: { [Op.in]: ["Amazing.url"] }
    }, {});
  }
};
