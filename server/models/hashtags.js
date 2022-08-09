"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class hashtags extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      hashtags.belongsToMany(models.cards, {
        through: "cardHashTag",
      });
    }
  }
  hashtags.init(
    {
      hashname: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "hashtags",
    }
  );
  return hashtags;
};
