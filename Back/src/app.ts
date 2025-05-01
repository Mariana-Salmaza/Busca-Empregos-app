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

app.use("/users", UserRoutes);
app.use("/vacancies", VacanciesRoutes);
app.use("/favorites", FavoritesRoutes);
app.use("/applications", ApplicationsRoutes);
app.use("/login", LoginRoutes);

export default app;
