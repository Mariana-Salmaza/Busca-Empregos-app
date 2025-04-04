import express from "express";
import {
  getAllApplications,
  applyForVacancy,
  updateApplicationStatus,
  destroyApplication,
} from "../controllers/ApplicationsController";
import { authMiddleware } from "../middleware/authMiddleware";

const router = express.Router();

router.get("/api/applications", authMiddleware, getAllApplications);
router.post("/api/applications", authMiddleware, applyForVacancy);
router.put("/api/applications/:id", authMiddleware, updateApplicationStatus);
router.delete("/api/applications/:id", authMiddleware, destroyApplication);

export default router;
