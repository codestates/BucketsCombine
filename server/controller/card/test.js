const { cardHashtags } = require("../../models/");

module.exports = async (req, res) => {
  const preCardid = await cardHashtags.findOne({
    where: {
      cards_id: req.body.cards_id,
    },
  });

  console.log(preCardid);
  res.send(preCardid);
};
