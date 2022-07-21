const { userCardJoins } = require("../../models");
module.exports = async (req, res) => {
  const createCard = await userCardJoins.findOrCreate({
    where: {
      cards_id: req.body.cards_id,
      users_id: req.body.users_id,
    },
  });
  //카드 아이디랑 유저아이디 - 존재해야만함
  console.log("생성", { data: { createCard } });
  res.send("생성");
};
