import { Request, Response } from "express";
import FavoritesModel from "../model/FavoritesModel";

// Buscar favoritos do usuário
export const getAllFavorites = async (req: Request, res: Response) => {
  try {
    const favorites = await FavoritesModel.findAll();
    res.json(favorites);
  } catch (error) {
    res.status(500).json({ error: "Erro interno no servidor", details: error });
  }
};

// Criar um favorito
export const addFavorite = async (req: Request, res: Response) => {
  try {
    const { user_id, vacancy_id } = req.body;
    if (!user_id || !vacancy_id) {
      return res.status(400).json({ error: "Values required" });
    }
    const favorite = await FavoritesModel.create({ user_id, vacancy_id });
    res.status(201).json(favorite);
  } catch (error) {
    res.status(500).json({ error: "Erro interno no servidor", details: error });
  }
};

// Remover favorito
export const destroyFavorite = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  try {
    const favorite = await FavoritesModel.findByPk(req.params.id);
    if (!favorite) {
      return res.status(404).json({ error: "Favorite not found" });
    }
    await favorite.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Erro interno no servidor", details: error });
  }
};
