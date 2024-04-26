"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Category, {
        foreignKey: "categoryId",
        as: "category",
      });
    }
  }
  Product.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      urlImg: {
        type: DataTypes.STRING,
      },
      name: {
        type: DataTypes.STRING,
      },
      gender: {
        type: DataTypes.STRING,
      },
      categoryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Category",
          key: "id",
        },
      },
      brand: {
        type: DataTypes.STRING,
      },
      listUrlImg: {
        type: DataTypes.ARRAY(DataTypes.STRING),
      },
      department: {
        type: DataTypes.STRING,
      },
      price: {
        type: DataTypes.DECIMAL(10, 2),
      },
      assessment: {
        type: DataTypes.INTEGER,
      },
      discountValue: {
        type: DataTypes.DECIMAL(10, 2),
      },
      listOfSize: {
        type: DataTypes.ARRAY(DataTypes.INTEGER),
      },
      trending: {
        type: DataTypes.BOOLEAN,
      },
      description: {
        type: DataTypes.TEXT,
      },
    },
    {
      sequelize,
      modelName: "Product",
      tableName: "products",
      timestamps: false,
    }
  );

  return Product;
};
