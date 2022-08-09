"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class cards extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      //models 는 db 객체 testdb.users 의미

      // define association here

      cards.belongsTo(models.users, {
        foreignKey: { name: "users_id", allowNull: true },
        onDelete: "CASCADE",
      });
      cards.belongsToMany(models.hashtags, {
        through: "cardHashTag",
      }),
        cards.belongsToMany(models.users, {
          through: "userCardJoin",
        });
    }
  }
  //n:m관계에서 Query문을 날릴 땐, through와 구체적인 attributes를 명시
  cards.init(
    {
      title: DataTypes.STRING,
      cardtext: DataTypes.TEXT,
      background: DataTypes.STRING,
      completed: { type: DataTypes.INTEGER, defaultValue: "0" },
      users_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "cards",
    }
  );
  return cards;
};
