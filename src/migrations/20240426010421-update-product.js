module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("categories", "description", {
      type: Sequelize.STRING,
      allowNull: true,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("categories", "description");
  },
};
