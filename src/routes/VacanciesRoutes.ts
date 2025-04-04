import express from "express";
import {
  getAllVacancies,
  getVacancyById,
  createVacancy,
  updateVacancy,
  destroyVacancyById,
} from "../controllers/VacanciesController";
import { authMiddleware } from "../middleware/authMiddleware";

const router = express.Router();

router.get("/api/vacancies", getAllVacancies);
router.get("/api/vacancies/:id", getVacancyById);
router.post("/api/vacancies", authMiddleware, createVacancy);
router.put("/api/vacancies/:id", authMiddleware, updateVacancy);
router.delete("/api/vacancies/:id", authMiddleware, destroyVacancyById);

export default router;
