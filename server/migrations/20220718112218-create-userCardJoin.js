"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("userCardJoins", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      users_id: {
        type: Sequelize.INTEGER,
        allowNull: null,
        references: { model: "users", key: "id" },
      },
      cards_id: {
        type: Sequelize.INTEGER,
        allowNull: null,
        references: { model: "cards", key: "id" },
      },
      stampeds_id: {
        primaryKey: false,
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: null,
        references: { model: "stampeds", key: "id" },
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
    //foreignKey
    //! users_id 나 cards_id 둘중 하나를 지울 경우 해당 유저카드조인아이디 삭제

    // card id , stamped id , users id
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("userCardJoins", "user_id");
    await queryInterface.removeColumn("userCardJoins", "cards_id");
    await queryInterface.removeColumn("userCardJoins", "stampeds_id");
    await queryInterface.dropTable("userCardJoins");
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  },
};
