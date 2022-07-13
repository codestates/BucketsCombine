"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("stampeds", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      id: {
        type: Sequelize.INTEGER,
      },
      title: {
        type: Sequelize.STRING,
      },
      cardtext: {
        type: Sequelize.STRING,
      },
      imageurl: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      }
    }).then(function () {
      queryInterface.addColumn("userCardJoin", "stamped_id", {
        type: Sequelize.INTEGER,
        references: {model: "stamped", key: "id"},
      });
    }).then(function () {
      queryInterface.addColumn("cardHashtag", "stamped_id", {
        type: Sequelize.INTEGER,
        references: {model: "stamped", key: "id"},
      });
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("stampeds");
  },
};
