const { DataTypes } = require("sequelize");
const database = require("../config/database");

const Collection = database.sequelize.define(
  "Collection",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    name: DataTypes.STRING,
    description: DataTypes.STRING,
  },
  {
    timestamps: false,
    tableName: "collections",
  }
);

module.exports = Collection;
