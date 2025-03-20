import express from "express";
import {
  getAllVacancies,
  getVacancyById,
  createVacancy,
  updateVacancy,
  destroyVacancyById,
} from "../controllers/VacanciesController";

const router = express.Router();

router.post("/vacancies", createVacancy);

router.get("/vacancies", getAllVacancies);
router.get("/vacancies/:id", getVacancyById);
router.put("/vacancies/:id", updateVacancy);
router.delete("/vacancies/:id", destroyVacancyById);

export default router;
