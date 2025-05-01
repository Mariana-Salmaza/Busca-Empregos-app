import express from "express";
import {
  getAllFavorites,
  addFavorite,
  destroyFavorite,
} from "../controllers/FavoritesController";
import { authMiddleware } from "../middleware/authMiddleware";

const router = express.Router();
router.get("/", authMiddleware, getAllFavorites);
router.post("/", authMiddleware, addFavorite);
router.delete("/:id", authMiddleware, destroyFavorite);

export default router;
