import { Request, Response } from "express";
import FavoritesModel from "../model/FavoritesModel";
import VacanciesModel from "../model/VacanciesModel";
import { error } from "console";
import UserModel from "../model/UserModel";

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
    res.status(500).json({ error: "Erro interno do servidor", details: error });
  }
};

export const getAllUserFavorites = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;

    const user = await UserModel.findByPk(userId);
    if (!user) {
      return res.status(404).json({ error: "Usuario não encontrado." });
    }

    const userFavorites = await FavoritesModel.findAll({
      where: { user_id: userId },
    });
  } catch (error: unknown) {
    console.error("Erro ao buscar favoritos:", error);
    return res.status(500).json({ error: "Erro interno ao buscar favoritos." });
  }
};

export const addFavorite = async (req: Request, res: Response) => {
  try {
    const { user_id, vacancy_id } = req.body;

    if (!user_id || !vacancy_id) {
      return res.status(400).json({ error: "Valores obrigatórios" });
    }
    const vacancy = await VacanciesModel.findByPk(vacancy_id);
    if (!vacancy) {
      return res.status(404).json({ error: "Vaga não encontrada" });
    }
    const existingFavorite = await FavoritesModel.findOne({
      where: { user_id, vacancy_id },
    });

    if (existingFavorite) {
      return res.status(400).json({ error: "Vaga já favoritada" });
    }

    const favorite = await FavoritesModel.create({ user_id, vacancy_id });
    res.status(201).json(favorite);
  } catch (error) {
    res.status(500).json({ error: "Erro interno do servidor", details: error });
  }
};

export const destroyFavorite = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { user_id } = req.body;

    if (!user_id) {
      return res.status(400).json({ error: "ID do usuário é obrigatório" });
    }

    const favorite = await FavoritesModel.findOne({
      where: { id, user_id },
    });

    if (!favorite) {
      return res
        .status(404)
        .json({ error: "Favorito não encontrado ou não pertence ao usuário" });
    }

    await favorite.destroy();
    res.status(204).json({ message: "Favorito removido com sucesso!" });
  } catch (error) {
    res.status(500).json({ error: "Erro interno do servidor", details: error });
  }
};
