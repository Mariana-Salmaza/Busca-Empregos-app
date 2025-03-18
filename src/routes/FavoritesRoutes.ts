
import express from "express";
import {
  getAll,
  getFavoritesById,
  createFavorites,
  updateFavorites,
  destroyFavoritesById,
} from "../controllers/FavoritesController";

const router = express.Router();

router.get("/favorites", getAll);
router.get("/favorites/:id", getFavoritesById);
router.post("/favorites", createFavorites);
router.put("/favorites/:id", updateFavorites);
router.delete("/favorites/:id", destroyFavoritesById);

export default router;
