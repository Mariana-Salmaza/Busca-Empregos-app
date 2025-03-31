import { Request, Response } from "express";
import FavoritesModel from "../model/FavoritesModel";
import VacanciesModel from "../model/VacanciesModel";
import { error } from "console";

export const getAllFavorites = async (req: Request, res: Response) => {
  try {
    const favorites = await FavoritesModel.findAll({
      include: [
        {
          model: VacanciesModel,
          as: "vacancy",
          attributes: ["id", "title", "description", "location", "salary"],
        },
      ],
    });

    res.json(favorites);
  } catch (error) {
    res.status(500).json({ error: "Internal server error", details: error });
  }
};

export const addFavorite = async (req: Request, res: Response) => {
  try {
    const { user_id, vacancy_id } = req.body;

    if (!user_id || !vacancy_id) {
      return res.status(400).json({ error: "Values required" });
    }
    const vacancy = await VacanciesModel.findByPk(vacancy_id);
    if (!vacancy) {
      return res.status(404).json({ error: "Vacancy not found" });
    }
    const existingFavorite = await FavoritesModel.findOne({
      where: { user_id, vacancy_id },
    });

    if (existingFavorite) {
      return res.status(400).json({ error: "Vacancy already favorited" });
    }

    const favorite = await FavoritesModel.create({ user_id, vacancy_id });
    res.status(201).json(favorite);
  } catch (error) {
    res.status(500).json({ error: "Internal server error", details: error });
  }
};

export const destroyFavorite = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { user_id } = req.body;

    if (!user_id) {
      return res.status(400).json({ error: "User ID is required" });
    }

    const favorite = await FavoritesModel.findOne({
      where: { id, user_id },
    });

    if (!favorite) {
      return res
        .status(404)
        .json({ error: "Favorite not found or does not belong to the user" });
    }

    await favorite.destroy();
    res.status(204).json({ message: "Favorite successfully removed!" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error", details: error });
  }
};
