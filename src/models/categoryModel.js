const { DataTypes } = require("sequelize");
const database = require("../config/database");
const Product = require("./productModel");

const Category = database.sequelize.define(
  "Category",
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
    tableName: "categories",
  }
);

module.exports = Category;
