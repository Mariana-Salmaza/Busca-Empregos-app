import Express from "express";
import {
  getAll,
  getVacanciesById,
  createVacancie,
  updateVacancie,
  destroyVacancieById,
} from "../controllers/VacanciesController";

const router = Express.Router();

router.get("/vacancies", getAll);
router.get("/vacancies/:id", getVacanciesById);
router.post("/vacancies", createVacancie);
router.put("/vacancies/:id", updateVacancie);
router.delete("/vacancies/:id", destroyVacancieById);

export default router;
