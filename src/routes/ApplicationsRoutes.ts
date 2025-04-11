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

router.post("/", authMiddleware, createApplication);
router.get("/", authMiddleware, getAllApplications);
router.get("/:id", authMiddleware, getApplicationById);
router.put("/:id", authMiddleware, updateApplication);
router.delete("/:id", authMiddleware, destroyApplication);

export default router;
