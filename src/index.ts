import express from "express";
import cors from "cors";
import sequelize from "./config/database";
import VacanciesRoutes from "./routes/VacanciesRoutes";
import FavoritesRoutes from "./routes/FavoritesRoutes";
import ApplicationsRoutes from "./routes/ApplicationsRoutes";
import LoginRoutes from "./routes/LoginRoutes";
import UserRoutes from "./routes/UserRoutes";

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.use(UserRoutes);
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
