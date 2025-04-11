import express from "express";
import cors from "cors";

import VacanciesRoutes from "./routes/VacanciesRoutes";
import FavoritesRoutes from "./routes/FavoritesRoutes";
import ApplicationsRoutes from "./routes/ApplicationsRoutes";
import LoginRoutes from "./routes/LoginRoutes";
import UserRoutes from "./routes/UserRoutes";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/users", UserRoutes);
app.use("/api/vacancies", VacanciesRoutes);
app.use("/api/favorites", FavoritesRoutes);
app.use("/api/applications", ApplicationsRoutes);
app.use("/api/login", LoginRoutes);

export default app;
