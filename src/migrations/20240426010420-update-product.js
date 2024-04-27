module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.removeColumn("products", "category");
    await queryInterface.addColumn("products", "categoryId", {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        tableName: "categories",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("products", "categoryId");
  },
};
