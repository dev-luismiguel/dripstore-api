const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: "postgres",
});

async function initializeDatabase() {
  try {
    await sequelize.authenticate();
    console.log("Conexão estabelecida com sucesso.");

    await sequelize.sync();
    console.log("Todos os modelos foram sincronizados com sucesso.");
  } catch (error) {
    console.error("Erro ao sincronizar os modelos:", error);
  }
}

module.exports = {
  initializeDatabase,
  sequelize,
};
