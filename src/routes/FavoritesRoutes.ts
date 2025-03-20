import express from "express";
import {
  getAllFavorites,
  addFavorite,
  destroyFavorite,
} from "../controllers/FavoritesController";

const router = express.Router();

router.post("/favorites", addFavorite);

router.get("/favorites", getAllFavorites);
router.delete("/favorites/:id", destroyFavorite);

export default router;
