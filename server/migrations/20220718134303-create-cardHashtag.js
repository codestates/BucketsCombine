"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    queryInterface.createTable("cardHashtags", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      cards_id: {
        type: Sequelize.INTEGER,
        allowNull: null,
        references: { model: "cards", key: "id" },
      },
      hashtags_id: {
        type: Sequelize.INTEGER,
        allowNull: null,
        references: { model: "hashtags", key: "id" },
      },
      createdAt: {
        defaultValue: Sequelize.fn("NOW"),
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        defaultValue: Sequelize.fn("NOW"),
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("cardHashtags", " cards_id");
    await queryInterface.removeColumn("cardHashtags", " hashtags_id");
    await queryInterface.dropTable("cardHashtags");
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  },
};
//
