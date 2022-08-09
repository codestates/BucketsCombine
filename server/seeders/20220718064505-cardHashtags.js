"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    {
      await queryInterface.bulkInsert("cardHashtags", [
        {
          cards_id: 1,
          hashtags_id: 1,
        },
        {
          cards_id: 2,
          hashtags_id: 1,
        },
        {
          cards_id: 15,
          hashtags_id: 2,
        },
        {
          cards_id: 7,
          hashtags_id: 3,
        },
        {
          cards_id: 7,
          hashtags_id: 4,
        },
        {
          cards_id: 19,
          hashtags_id: 1,
        },
        {
          cards_id: 5,
          hashtags_id: 1,
        },
      ]);
    }
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("cardHashtags", null, {});
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
