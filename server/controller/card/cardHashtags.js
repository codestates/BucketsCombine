const { cardHashtags } = require("../../models/");
module.exports = async (req, res) => {
  const cardHashtagsinfo = await cardHashtags.findAll({});
  res.send(cardHashtagsinfo);
};
