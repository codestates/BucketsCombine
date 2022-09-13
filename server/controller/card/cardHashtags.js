const { cardHashtags } = require("../../models/");
module.exports = async (req, res) => {
  const cardHashtagsinfo = await cardHashtags
    .findAll({})
    .catch((err) => console.log(err));
  res.send(cardHashtagsinfo);
};
