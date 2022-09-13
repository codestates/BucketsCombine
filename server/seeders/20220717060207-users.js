"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("users", [
      {
        username: "김도훈",
        email: "kdh@gmail.com",
        password: "0000",
        usertext: "게임을 좋아하는 낭랑 18세",
        oauthlogin: "local",
        userphotourl: "server/src/dohoonkim.jpeg",
        createdAt: new Date(),
        updatedAt: new Date(),
        age: "20대",
        gender: "남성",
      },
      {
        username: "윤태영",
        email: "yty@gmail.com",
        password: "0000",
        usertext: "내가 바로 CSS 요리사",
        oauthlogin: "local",
        userphotourl: "server/src/taehoon.jpeg",
        createdAt: new Date(),
        updatedAt: new Date(),
        age: "20대",
        gender: "남성",
      },
      {
        username: "이태훈",
        email: "lth@gmail.com",
        password: "0000",
        usertext: "Load of the cording",
        oauthlogin: "local",
        userphotourl: "server/src/teayoung.jpeg",
        createdAt: new Date(),
        updatedAt: new Date(),
        age: "20대",
        gender: "남성",
      },
      {
        username: "이윤창",
        email: "lyc@gmail.com",
        password: "0000",
        usertext: "저도 쉬고 싶어요",
        oauthlogin: "local",
        userphotourl: "server/src/hujy4023.jpeg",
        createdAt: new Date(),
        updatedAt: new Date(),
        age: "20대",
        gender: "남성",
      },
      {
        username: "이현석",
        email: "lhs@gmail.com",
        password: "0000",
        usertext: "merge 하겠습니다",
        oauthlogin: "local",
        userphotourl: "server/src/leehunds.jpeg",
        createdAt: new Date(),
        updatedAt: new Date(),
        age: "20대",
        gender: "남성",
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("users", null, {});
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};

// npx sequelize-cli db:migrate
// npx sequelize-cli db:seed:all
