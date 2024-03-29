"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class cardHashtags extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      //models 는 db 객체 testdb.users 의미
      // define association here
      cardHashtags.belongsTo(models.cards, {
        foreignKey: { name: "cards_id", allowNull: true },
        onDelete: "CASCADE",
      });
      cardHashtags.belongsTo(models.hashtags, {
        foreignKey: { name: "hashtags_id", allowNull: true },
        onDelete: "CASCADE",
      });
    }
  }
  //n:m관계에서 Query문을 날릴 땐, through와 구체적인 attributes를 명시
  cardHashtags.init(
    {
      cards_id: DataTypes.INTEGER,
      hashtags_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "cardHashtags",
    }
  );
  return cardHashtags;
};
