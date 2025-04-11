import express from "express";
import {
  getAllFavorites,
  addFavorite,
  destroyFavorite,
} from "../controllers/FavoritesController";
import { authMiddleware } from "../middleware/authMiddleware";

const router = express.Router();

router.get("/api/favorites", authMiddleware, getAllFavorites);
router.post("/api/favorites", authMiddleware, addFavorite);
router.delete("/api/favorites/:id", authMiddleware, destroyFavorite);

export default router;
