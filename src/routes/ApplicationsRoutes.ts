import express from "express";
import {
  getAllApplications,
  createApplication,
  getApplicationById,
  updateApplication,
  destroyApplication,
} from "../controllers/ApplicationsController";
import { authMiddleware } from "../middleware/authMiddleware";

const router = express.Router();

router.post("/applications", authMiddleware, createApplication);
router.get("/applications", authMiddleware, getAllApplications);
router.get("/applications/:id", authMiddleware, getApplicationById);
router.put("/applications/:id", authMiddleware, updateApplication);
router.delete("/applications/:id", authMiddleware, destroyApplication);

export default router;
