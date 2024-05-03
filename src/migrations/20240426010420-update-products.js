"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    Promise.all([
      queryInterface.removeColumn("products", "category"),
      queryInterface.addColumn("products", "categoryId", {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: {
            tableName: "categories",
          },
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      }),
    ]);
  },
  async down(queryInterface, Sequelize) {
    Promise.all([
      queryInterface.addColumn("products", "category", {
        type: Sequelize.DataTypes.STRING,
      }),
      queryInterface.removeColumn("products", "categoryId"),
    ]);
  },
};
