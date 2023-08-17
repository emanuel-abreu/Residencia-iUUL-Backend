import { Sequelize } from "sequelize";

const sequelize = new Sequelize({
  dialect: "postgres",
  host: "localhost",
  username: "emanuel",
  password: "emanuel",
  port: 5432,
  database: "constultorioOdontologicoBD",
  define: {
    underscored: true,
  },
});

// Testar a conexão
try {
  await sequelize.authenticate();
  console.log("Conexão com o banco de dados estabelecida com sucesso!");
} catch (error) {
  console.error("Não foi possível conectar ao banco de dados:", error);
}

export { sequelize };
