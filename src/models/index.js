const Category = require('./categoryModel')
const Product = require('./productModel')

Category.hasMany(Product, { foreignKey: "categoryId", allowNull: true });
Product.belongsTo(Category, { foreignKey: "categoryId", allowNull: true });

module.exports = {
  Category,
  Product,
}