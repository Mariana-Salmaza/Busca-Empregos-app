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

// Rota pública
router.post("/users", createUser);

// Rotas privadas
router.get("/users", authMiddleware, getAll);
router.get("/users/:id", authMiddleware, getUserById);
router.put("/users/:id", authMiddleware, updateUser);
router.delete("/users/:id", authMiddleware, destroyUserById);

export default router;
