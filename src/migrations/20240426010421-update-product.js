'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const table = await queryInterface.describeTable('categories');

    if (!table.description) {
      await queryInterface.addColumn('categories', 'description', {
        type: Sequelize.STRING,
        allowNull: true,
      });
    }
  },

  async down(queryInterface, Sequelize) {
    const table = await queryInterface.describeTable('categories');

    if (table.description) {
      await queryInterface.removeColumn('categories', 'description');
    }
  },
};
