import { Request, Response } from "express";
import FavoritesModel from "../model/FavoritesModel";

// método que busca todos
export const getAll = async (req: Request, res: Response) => {
  const favorites = await FavoritesModel.findAll();
  res.send(favorites);
};

// método que busca por id
export const getFavoritesById = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  const favorite = await FavoritesModel.findByPk(req.params.id);

  return res.json(favorite);
};

// método que cria um novo favorito
export const createFavorites = async (req: Request, res: Response) => {
  try {
    const { user_id, vacancy_id, saved_at } = req.body;

    if (!user_id || !vacancy_id || !saved_at) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const favorite = await FavoritesModel.create({ user_id, vacancy_id, saved_at });
    res.status(201).json(favorite);
  } catch (error) {
    res.status(500).json("Erro interno no servidor " + error);
  }
};

// método que atualiza um favorito
export const updateFavorites = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  try {
    const { user_id, vacancy_id, saved_at } = req.body;

    const favorite = await FavoritesModel.findByPk(req.params.id);
    if (!favorite) {
      return res.status(404).json({ error: "Favorite not found" });
    }

    favorite.user_id = user_id;
    favorite.vacancy_id = vacancy_id;
    favorite.saved_at = saved_at;

    await favorite.save();
    res.status(201).json(favorite);
  } catch (error) {
    res.status(500).json("Erro interno no servidor " + error);
  }
};

// método que destrói
export const destroyFavoritesById = async (
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
    res.status(500).json("Erro interno no servidor " + error);
  }
};
