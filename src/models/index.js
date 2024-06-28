const Category = require('./categoryModel')
const Product = require('./productModel')
const Customer = require('./customerModel')
const Order = require('./orderModel')
const OrderItem = require('./orderItemModel')
const Collection = require('./collectionModel')

Category.hasMany(Product, { foreignKey: "categoryId", allowNull: true });
Product.belongsTo(Category, { foreignKey: "categoryId", allowNull: true });
Order.belongsTo(Customer, { foreignKey: "customer_id" });
Order.hasMany(OrderItem, { foreignKey: "order_id" });
OrderItem.belongsTo(Order, { foreignKey: "order_id" });
OrderItem.belongsTo(Product, { foreignKey: "product_id" });
Product.belongsTo(Collection, { foreignKey: "collectionId", allowNull: true });

module.exports = {
  Category,
  Product,
  Customer,
  Order,
  OrderItem,
  Collection,
}