"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("userCardJoins", [
      {
        // 스탬프 카드는 하나
        users_id: 1,
        cards_id: 1,
        // 접속한 유저와 카드아이디의 유저아이디가 같거나 userCardJoin의 users_id가 같으면
        //해당userCardJoin id 마이버켓에 추가
        // 카드 컴플리트 / url 다 충족시 해당userCardJoin id 스템프에 추가
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        users_id: 2,
        cards_id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        users_id: 3,
        cards_id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // 위 세개의 카드는 스탬프가 완료된 카드라 가정
      {
        users_id: 3,
        cards_id: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        users_id: 2,
        cards_id: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      {
        users_id: 4,
        cards_id: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      {
        users_id: 5,
        cards_id: 5,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        users_id: 3,
        cards_id: 6,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        users_id: 2,
        cards_id: 7,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        users_id: 1,
        cards_id: 8,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        users_id: 3,
        cards_id: 9,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        users_id: 4,
        cards_id: 10,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        users_id: 5,
        cards_id: 11,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        users_id: 4,
        cards_id: 12,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        users_id: 3,
        cards_id: 13,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        users_id: 2,
        cards_id: 14,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        users_id: 1,
        cards_id: 15,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        users_id: 5,
        cards_id: 16,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        users_id: 3,
        cards_id: 17,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        users_id: 3,
        cards_id: 18,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        users_id: 2,
        cards_id: 19,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        users_id: 1,
        cards_id: 20,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },
  /**
   * Add seed commands here.
   *
   * Example:
   * await queryInterface.bulkInsert('People', [{
   *   name: 'John Doe',
   *   isBetaMember: false
   * }], {});
   */

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("userCardJoins", null, {});
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
