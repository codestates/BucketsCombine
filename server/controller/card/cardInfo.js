const { cards } = require("../../models");

module.exports = async (req, res) => {
  const cardinfo = await cards.findAll({});
  console.log({ data: { cardinfo } });
  res.send({ data: { cardinfo } });
};
// 카드의 정보를 홈페이지에 접속하면 줌
// 해쉬태그 / 조인한 멤버아이디
