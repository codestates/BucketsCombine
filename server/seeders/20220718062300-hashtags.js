"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("hashtags", [
      {
        hashname: "휴식",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        hashname: "공부",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        hashname: "연애",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        hashname: "여행",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        hashname: "복근",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        hashname: "운동",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("hashtags", null, {});
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
