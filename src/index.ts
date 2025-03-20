import express from "express";
import sequelize from "./config/database";
import userRoutes from "./routes/UserRoutes";
import VacanciesRoutes from "./routes/VacanciesRoutes";
import FavoritesRoutes from "./routes/FavoritesRoutes";
import ApplicationsRoutes from "./routes/ApplicationsRoutes";
import LoginRoutes from "./routes/LoginRoutes";

const app = express();
const port = 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello, World");
});

app.use(userRoutes);
app.use(VacanciesRoutes);
app.use(FavoritesRoutes);
app.use(ApplicationsRoutes);
app.use(LoginRoutes);

sequelize
  .sync({ alter: true })
  .then(() => {
    console.log("Database foi sincronizado com sucesso");
  })
  .catch((error) => {
    console.log("Erro na sincronização", error);
  });

app.listen(port, () => {
  console.log("Server is running on port", port);
});
