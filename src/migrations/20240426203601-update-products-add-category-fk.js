'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const table = await queryInterface.describeTable('products');

    if (table.category) {
      await queryInterface.removeColumn('products', 'category');
    }

    if (!table.categoryId) {
      await queryInterface.addColumn('products', 'categoryId', {
        type: Sequelize.INTEGER,
        references: {
          model: 'Categories',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      });
    }
  },

  async down(queryInterface, Sequelize) {
    const table = await queryInterface.describeTable('products');

    if (table.categoryId) {
      await queryInterface.removeColumn('products', 'categoryId');
    }

    await queryInterface.addColumn('products', 'category', {
      type: Sequelize.STRING,
    });
  },
};
