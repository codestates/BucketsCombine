const { userCardJoins } = require("../../models");
module.exports = async (req, res) => {
  const createCard = await userCardJoins
    .destroy({
      where: {
        cards_id: req.body.cards_id,
        users_id: req.body.users_id,
      },
    })
    .catch((err) => console.log(err));
  //카드 아이디랑 유저아이디 - 존재해야만함
  console.log("삭제", { data: { createCard } });
  res.send("삭제");
};
