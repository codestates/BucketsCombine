"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class userCardJoins extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      //models 는 db 객체 testdb.users 의미
      // define association here
      userCardJoins.belongsTo(models.cards, {
        foreignKey: { name: "cards_id", allowNull: true },
        onDelete: "CASCADE",
      });
      userCardJoins.belongsTo(models.users, {
        foreignKey: { name: "users_id", allowNull: true },
        onDelete: "CASCADE",
      });
      userCardJoins.belongsTo(models.stampeds, {
        foreignKey: { name: "stampeds_id", allowNull: true },
        onDelete: "CASCADE",
      });
    }
  }
  //n:m관계에서 Query문을 날릴 땐, through와 구체적인 attributes를 명시
  userCardJoins.init(
    {
      cards_id: DataTypes.INTEGER,
      users_id: DataTypes.INTEGER,
      stampeds_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "userCardJoins",
    }
  );
  return userCardJoins;
};
