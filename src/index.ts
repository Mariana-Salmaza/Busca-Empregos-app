import app from "./app";
import sequelize from "./config/database";
import dotenv from "dotenv";

dotenv.config();

const port = process.env.PORT || 3000;

sequelize
  .sync()
  .then(() => {
    console.log("Database foi sincronizado com sucesso");

    app.listen(port, () => {
      console.log(`Servidor rodando em http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.error("Erro ao sincronizar o banco de dados:", error);
  });
