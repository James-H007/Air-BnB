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
        spotId: 1,
        url: "https://i.redd.it/buaxvmhc50581.png",
        preview: false,
      },
      {
        spotId: 1,
        url: "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/3efe9f0c-9481-4478-bf95-549d5f215bc8/df2v2nn-dabd9d19-1549-45d6-abc8-e637ae18f600.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzNlZmU5ZjBjLTk0ODEtNDQ3OC1iZjk1LTU0OWQ1ZjIxNWJjOFwvZGYydjJubi1kYWJkOWQxOS0xNTQ5LTQ1ZDYtYWJjOC1lNjM3YWUxOGY2MDAucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.S6kTnpT7nbGkHosBjX0vRdCUrKujnx0oG30j4eUuXz4",
        preview: false,
      },
      {
        spotId: 1,
        url: "https://static.wikia.nocookie.net/cyberpunk/images/4/43/Corpo_Plaza_Apartment_Infobox_CP2077.jpg/revision/latest?cb=20230216131531",
        preview: false,
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
        spotId: 2,
        url: "https://static.wikia.nocookie.net/cyberpunk/images/8/8c/Westbrook_Database_CP2077.png/revision/latest?cb=20210806183420",
        preview: false,
      },
      {
        spotId: 2,
        url: "https://static1-us.millenium.gg/articles/9/21/77/9/@/207032-cyberpunk2077-westrbookwelcome-saturated-rgb-nalo91c9zz0qu76m-1-orig-1-article_m-1.jpeg",
        preview: false,
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
        spotId: 3,
        url: "https://oyster.ignimgs.com/mediawiki/apis.ign.com/cyberpunk-2077/2/2a/WCyberpunk266.png",
        preview: false,
      },
      {
        spotId: 3,
        url: "https://static.wikia.nocookie.net/cyberpunk/images/c/c1/VApartment_LivingRoom.png/revision/latest?cb=20201214060713",
        preview: false,
      },
      {
        spotId: 4,
        url: "https://oyster.ignimgs.com/mediawiki/apis.ign.com/cyberpunk-2077/a/a8/CP2077_Ripperdoc_BadlandLocation.png",
        preview: true
      },
      {
        spotId: 4,
        url: "https://www.xfire.com/wp-content/uploads/2020/10/badlands.webp",
        preview: false
      },
      {
        spotId: 4,
        url: "https://i.redd.it/0zicdgqocdm81.jpg",
        preview: false
      },
      {
        spotId: 5,
        url: "https://cdn.gfinityesports.com/images/ncavvykf/gfinityesports/67d6671daa1e4f7fdd5b0e415bc9df8ea9ad96ee-1480x742.jpg?rect=81,0,1318,742&w=700&h=394",
        preview: true
      },
      {
        spotId: 5,
        url: "http://static1.squarespace.com/static/5e9dcdfdeed291246bf96c27/t/634f03532db204608c38a32c/1666122592834/Glen+Apartment+2.png?format=1500w",
        preview: false
      },
      {
        spotId: 5,
        url: "https://static.wikia.nocookie.net/cyberpunk/images/b/bb/Nlc-scr-1.jpg/revision/latest/scale-to-width-down/1200?cb=20200918173427",
        preview: false
      },
      {
        spotId: 6,
        url: "https://i.redd.it/8uvwormn78661.jpg",
        preview: true
      },
      {
        spotId: 6,
        url: "https://static.wikia.nocookie.net/cyberpunk/images/7/7e/CP77_Night_City_Stadium_01.jpg/revision/latest?cb=20210403195200",
        preview: false
      },
      {
        spotId: 6,
        url: "https://eip.gg/wp-content/uploads/2022/06/Cyberpunk-2077-Apartments-1024x576.jpg",
        preview: false
      },
      {
        spotId: 7,
        url: "https://static1.srcdn.com/wordpress/wp-content/uploads/2020/07/New-Cyberpunk-2077-Art-Shows-Night-City---s-Santo-Domingo-District.jpg",
        preview: true
      },
      {
        spotId: 7,
        url: "https://oyster.ignimgs.com/mediawiki/apis.ign.com/cyberpunk-2077/6/6b/CP2077_Ripper_ArroyoLocation.png",
        preview: false
      },
      {
        spotId: 7,
        url: "https://static.wikia.nocookie.net/cyberpunk/images/1/19/SantoDomingo_Database_CP2077.png/revision/latest?cb=20210806183313",
        preview: false
      },
      {
        spotId: 8,
        url: "https://pbs.twimg.com/media/FYIY0jZUcAEj3xG?format=jpg&name=4096x4096",
        preview: true
      },
      {
        spotId: 8,
        url: "https://i.ibb.co/LdM0NNn/20221015055620-1.jpg",
        preview: false
      },
      {
        spotId: 8,
        url: "https://staticdelivery.nexusmods.com/images/3333/31315095-1664898131.jpg",
        preview: false
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
