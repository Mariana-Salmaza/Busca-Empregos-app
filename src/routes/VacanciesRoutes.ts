import express from "express";
import {
  getAllVacancies,
  getVacancyById,
  createVacancy,
  updateVacancy,
  destroyVacancy,
} from "../controllers/VacanciesController";
import { authMiddleware } from "../middleware/authMiddleware";

const router = express.Router();

router.post("/vacancies", authMiddleware, createVacancy);
router.get("/vacancies", getAllVacancies);
router.get("/vacancies/:id", getVacancyById);
router.put("/vacancies/:id", authMiddleware, updateVacancy);
router.delete("/vacancies/:id", authMiddleware, destroyVacancy);

export default router;
