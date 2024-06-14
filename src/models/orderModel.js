const { DataTypes } = require("sequelize");
const database = require("../config/database");

const Order = database.sequelize.define(
  "Order",
  {
    order_number: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    customer_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "orders",
    timestamps: false,
  }
);

module.exports = Order;