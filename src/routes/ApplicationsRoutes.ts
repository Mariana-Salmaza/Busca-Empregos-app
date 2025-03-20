import express from "express";
import {
  getAllApplications,
  applyForVacancy,
  updateApplicationStatus,
  destroyApplication,
} from "../controllers/ApplicationsController";

const router = express.Router();

router.post("/applications", applyForVacancy);

router.get("/applications", getAllApplications);
router.put("/applications/:id", updateApplicationStatus);
router.delete("/applications/:id", destroyApplication);

export default router;
