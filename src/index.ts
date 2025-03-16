// importando a biblioteca
import express from "express";
import sequelize from "./config/database";
import userRoutes from "./routes/UserRoutes";

// instanciando uma variável com o servidor
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello, World");
});

app.use(userRoutes);

// sincronização do modelo com o banco de dados
// sync database
// promisse
sequelize
  .sync({ alter: true })
  .then(() => {
    console.log("database foi sicronizado com sucesso");
  })
  .catch((error) => {
    console.log("deu erro na sicronização", error);
  });

app.listen(port, () => {
  console.log("Server is running on port", port);
});
