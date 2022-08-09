"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      users.hasMany(models.cards, {
        foreignKey: "users_id",
        sourceKey: "id",
      });
      users.belongsToMany(models.cards, { through: "userCardJoin" });
    }
  }
  users.init(
    {
      username: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      usertext: DataTypes.TEXT,
      oauthlogin: DataTypes.STRING,
      userphotourl: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "users",
    }
  );
  return users;
};
