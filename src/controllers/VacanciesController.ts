import { Request, Response } from "express";
import VacanciesModel from "../model/VacanciesModel";

export const createVacancy = async (req: Request, res: Response) => {
  try {
    const { title, description, location, salary, user_id } = req.body;
    const newVacancy = await VacanciesModel.create({
      title,
      description,
      location,
      salary,
      user_id,
    });
    res.status(201).json(newVacancy);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao criar a vaga" });
  }
};

export const getAllVacancies = async (req: Request, res: Response) => {
  try {
    const vacancies = await VacanciesModel.findAll();
    res.status(200).json(vacancies);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao buscar vagas" });
  }
};

export const getVacancyById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const vacancy = await VacanciesModel.findByPk(id);
    if (!vacancy) {
      return res.status(404).json({ error: "Vaga não encontrada" });
    }
    res.status(200).json(vacancy);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao buscar vaga" });
  }
};

export const updateVacancy = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, description, location, salary, user_id } = req.body;
  try {
    const vacancy = await VacanciesModel.findByPk(id);
    if (!vacancy) {
      return res.status(404).json({ error: "Vaga não encontrada" });
    }

    vacancy.title = title || vacancy.title;
    vacancy.description = description || vacancy.description;
    vacancy.location = location || vacancy.location;
    vacancy.salary = salary || vacancy.salary;
    vacancy.user_id = user_id || vacancy.user_id;

    await vacancy.save();
    res.status(200).json(vacancy);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao atualizar vaga" });
  }
};

export const destroyVacancy = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const vacancy = await VacanciesModel.findByPk(id);
    if (!vacancy) {
      return res.status(404).json({ error: "Vaga não encontrada" });
    }
    await vacancy.destroy();
    res.status(200).json({ message: "Vaga deletada com sucesso" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao deletar vaga" });
  }
};
