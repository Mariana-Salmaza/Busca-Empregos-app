import express from "express";
import {
  getAllVacancies,
  getVacancyById,
  createVacancy,
  updateVacancy,
  destroyVacancy,
  getAllUserVacancies,
} from "../controllers/VacanciesController";
import { authMiddleware } from "../middleware/authMiddleware";

const router = express.Router();

router.post("/", authMiddleware, createVacancy);
router.get("/", getAllVacancies);
router.get("/:id", authMiddleware, getVacancyById);
router.put("/:id", authMiddleware, updateVacancy);
router.delete("/:id", authMiddleware, destroyVacancy);
router.get("/my/:id", authMiddleware, getAllUserVacancies);

export default router;
