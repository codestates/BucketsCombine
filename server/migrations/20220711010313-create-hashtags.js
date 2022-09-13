"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("hashtags", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      hashname: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface
      .dropTable("hashtags")
      .then(() => queryInterface.dropTable("cardHashtag", "hashtag_id"));
  },
};
