const { userCardJoins } = require("../../models");
module.exports = async (req, res) => {
  const createCard = await userCardJoins.findOrCreate({
    where: {
      cards_id: req.body.cards_id,
      users_id: req.body.users_id,
    },
  });

  console.log("생성", { data: { createCard } });
  res.send("생성");
};
