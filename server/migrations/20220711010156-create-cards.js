"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("cards", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      title: {
        type: Sequelize.STRING,
      },
      cardtext: {
        type: Sequelize.TEXT,
      },
      background: {
        type: Sequelize.STRING,
      },
      completed: {
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
      users_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        foreignKey: true,
        onDelete: "CASCADE",
        references: { model: "users", key: "id" },
      },
    }); // users 의 id 가 삭제되면 삭제
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("cards");
    await queryInterface.dropTable("cardHashtag");
    await queryInterface.removeColumn("cards", "user_id");
  },
};
