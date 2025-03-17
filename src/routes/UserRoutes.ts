import express from "express";
import {
  createUser,
  getAll,
  getUserById,
  updateUser,
} from "../controllers/UserController";

const router = express.Router();

router.get("/users", getAll);
router.get("/users/:id", getUserById);
router.post("/users", createUser);
router.put("/users/:id", updateUser);

export default router;
