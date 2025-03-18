import express from "express";
import {
  getAll,
  getApplicationById,
  createApplication,
  updateApplication,
  destroyApplicationById,
} from "../controllers/ApplicationsController";

const router = express.Router();

router.get("/applications", getAll);
router.get("/applications/:id", getApplicationById);
router.post("/applications", createApplication);
router.put("/applications/:id", updateApplication);
router.delete("/applications/:id", destroyApplicationById);

export default router;
