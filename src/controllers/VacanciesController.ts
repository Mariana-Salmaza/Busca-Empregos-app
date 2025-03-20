import { Request, Response } from "express";
import VacanciesModel from "../model/VacanciesModel";

// Buscar todas as vagas
export const getAllVacancies = async (req: Request, res: Response) => {
  try {
    const vacancies = await VacanciesModel.findAll();
    res.json(vacancies);
  } catch (error) {
    res.status(500).json({ error: "Internal server error", details: error });
  }
};

// Buscar vaga por ID
export const getVacancyById = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  try {
    const vacancy = await VacanciesModel.findByPk(req.params.id);
    if (!vacancy) {
      return res.status(404).json({ error: "Vacancy not found" });
    }
    res.json(vacancy);
  } catch (error) {
    res.status(500).json({ error: "Internal server error", details: error });
  }
};

// Criar nova vaga
export const createVacancy = async (req: Request, res: Response) => {
  try {
    const { title, description, salary, location, user_id } = req.body;

    if (!user_id) {
      return res.status(400).json({ message: "User not authenticated!" });
    }

    const vacancy = await VacanciesModel.create({
      title,
      description,
      salary,
      location,
      user_id,
    });

    return res.status(201).json(vacancy);
  } catch (error) {
    console.error("Error creating vacancy:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Atualizar vaga
export const updateVacancy = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  try {
    const { title, description, location, salary, user_id } = req.body;

    if (!title && !description && !location && !salary && !user_id) {
      return res.status(400).json({ error: "At least one field is required" });
    }

    const vacancy = await VacanciesModel.findByPk(req.params.id);
    if (!vacancy) {
      return res.status(404).json({ error: "Vacancy not found" });
    }

    if (title) vacancy.title = title;
    if (description) vacancy.description = description;
    if (location) vacancy.location = location;
    if (salary) vacancy.salary = salary;
    if (user_id) vacancy.user_id = user_id;

    await vacancy.save();
    res.status(200).json(vacancy);
  } catch (error) {
    console.error("Error updating vacancy:", error);
    res.status(500).json({ error: "Internal server error", details: error });
  }
};

// Excluir vaga
export const destroyVacancyById = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  try {
    const vacancy = await VacanciesModel.findByPk(req.params.id);
    if (!vacancy) {
      return res.status(404).json({ error: "Vacancy not found" });
    }
    await vacancy.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Internal server error", details: error });
  }
};
