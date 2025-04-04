import express from "express";
import {
  createUser,
  getAll,
  getUserById,
  updateUser,
  destroyUserById,
} from "../controllers/UserController";
import { authMiddleware } from "../middleware/authMiddleware";

const router = express.Router();

router.post("/api/users", createUser);
router.get("/api/users", authMiddleware, getAll);
router.get("/api/users/:id", authMiddleware, getUserById);
router.put("/api/users/:id", authMiddleware, updateUser);
router.delete("/api/users/:id", authMiddleware, destroyUserById);

export default router;
