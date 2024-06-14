const Category = require('./categoryModel')
const Product = require('./productModel')
const Customer = require('./customerModel')
const Order = require('./orderModel')
const OrderItem = require('./orderItemModel')

Category.hasMany(Product, { foreignKey: "categoryId", allowNull: true });
Product.belongsTo(Category, { foreignKey: "categoryId", allowNull: true });
Order.belongsTo(Customer, { foreignKey: "customer_id" });
Order.hasMany(OrderItem, { foreignKey: "order_id" });
OrderItem.belongsTo(Order, { foreignKey: "order_id" });
OrderItem.belongsTo(Product, { foreignKey: "product_id" });

module.exports = {
  Category,
  Product,
  Customer,
  Order,
  OrderItem,
}