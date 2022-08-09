"use strict";

const { sequelize } = require("../models");

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface
      .createTable("card", {
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
        member: {
          type: Sequelize.BOOLEAN,
        },
        completed: {
          type: Sequelize.BOOLEAN,
        },
        share: {
          type: Sequelize.BOOLEAN,
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
      })
      .then(function () {
        queryInterface.addColumn("card", "users_id", {
          type: Sequelize.INTEGER,
          allowNull: false,
          foreignKey: true,
          references: { model: "users", key: "id" },
        });
      })
      .then(function () {
        queryInterface.createTable("mybucket", {
          id: {
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            type: Sequelize.INTEGER,
          },
        });
      })
      .then(function () {
        queryInterface.addColumn("userCardJoin", "card_id", {
          allowNull: false,
          foreignKey: true,
          type: Sequelize.INTEGER,
          references: { model: "card", key: "id" },
        });
      })
      .then(function () {
        queryInterface.addColumn("userCardJoin", "mybucket_id", {
          allowNull: false,
          foreignKey: true,
          type: Sequelize.INTEGER,
          references: { model: "mybucket", key: "id" },
        });
      })
      .then(function () {
        queryInterface.createTable("cardHashtag", {
          id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER,
          },
          card_id: {
            allowNull: false,
            foreignKey: true,
            type: Sequelize.INTEGER,
            references: { model: "card", key: "id" },
          },
        });
      });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface
      .dropTable("card")
      .then(() =>
        queryInterface.bulkdelet(
          "mybucket",
          "mybucket_userCardJoin_id_foreign_idx",
          {}
        )
      );
  },
  async down(queryInterface, Sequelize) {
    await queryInterface
      .dropTable("mybucket")
      .then(() => queryInterface.dropTable("card"))
      .then(() => queryInterface.dropTable("cardHashtag"))
      .then(() => queryInterface.dropTable("users"));
  },
};
