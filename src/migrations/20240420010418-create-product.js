"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("products", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      urlImg: {
        type: Sequelize.STRING,
      },
      name: {
        type: Sequelize.STRING,
      },
      gender: {
        type: Sequelize.STRING,
      },
      category: {
        type: Sequelize.STRING,
      },
      brand: {
        type: Sequelize.STRING,
      },
      listUrlImg: {
        type: Sequelize.ARRAY(Sequelize.STRING),
      },
      department: {
        type: Sequelize.STRING,
      },
      price: {
        type: Sequelize.DECIMAL(10, 2),
      },
      assessment: {
        type: Sequelize.INTEGER,
      },
      discountValue: {
        type: Sequelize.DECIMAL(10, 2),
      },
      listOfSize: {
        type: Sequelize.ARRAY(Sequelize.INTEGER),
      },
      trending: {
        type: Sequelize.BOOLEAN,
      },
      description: {
        type: Sequelize.TEXT,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("products");
  },
};
