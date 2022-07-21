"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class stampeds extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      stampeds.hasMany(models.userCardJoins, {
        foreignKey: "stampeds_id",
        sourceKey: "id",
      });
    }
  }
  stampeds.init(
    {},
    {
      sequelize,
      modelName: "stampeds",
    }
  );
  return stampeds;
};
