module.exports = {
  async up(queryInterface, Sequelize) {
    Promise.all([
      queryInterface.removeColumn("products", "category"),
      queryInterface.addColumn("products", "categoryId", {
        type: Sequelize.INTEGER,
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
    await queryInterface.removeColumn("products", "categoryId");
  },
};
