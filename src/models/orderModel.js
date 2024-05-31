const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    static associate(models) {
      // Define association with the Customer model
      Order.belongsTo(models.Customer, {
        foreignKey: "customer_id",
        as: "customer",
      });
      // Define association with the OrderItem model
      Order.hasMany(models.OrderItem, {
        foreignKey: "order_id",
        as: "orderItems",
      });
    }
  }
  Order.init(
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
      sequelize,
      modelName: "Order",
      tableName: "orders",
    }
  );
  return Order;
};
