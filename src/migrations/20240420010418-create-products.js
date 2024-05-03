"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("products", {
      id: {
        type: Sequelize.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      urlImg: {
        type: Sequelize.DataTypes.STRING,
      },
      name: {
        type: Sequelize.DataTypes.STRING,
      },
      gender: {
        type: Sequelize.DataTypes.STRING,
      },
      category: {
        type: Sequelize.DataTypes.STRING,
      },
      brand: {
        type: Sequelize.DataTypes.STRING,
      },
      listUrlImg: {
        type: Sequelize.DataTypes.ARRAY(Sequelize.DataTypes.STRING),
      },
      department: {
        type: Sequelize.DataTypes.STRING,
      },
      price: {
        type: Sequelize.DataTypes.DECIMAL(10, 2),
      },
      assessment: {
        type: Sequelize.DataTypes.INTEGER,
      },
      discountValue: {
        type: Sequelize.DataTypes.DECIMAL(10, 2),
      },
      listOfSize: {
        type: Sequelize.DataTypes.ARRAY(Sequelize.DataTypes.INTEGER),
      },
      trending: {
        type: Sequelize.DataTypes.BOOLEAN,
      },
      description: {
        type: Sequelize.DataTypes.TEXT,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("products");
  },
};
