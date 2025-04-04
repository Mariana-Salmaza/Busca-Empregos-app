import { Request, Response } from "express";
import VacanciesModel from "../model/VacanciesModel";

export const getAllVacancies = async (req: Request, res: Response) => {
  try {
    const vacancies = await VacanciesModel.findAll();
    return res.status(200).json(vacancies);
  } catch (error) {
    console.error("Error fetching vacancies:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const getVacancyById = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  try {
    const vacancy = await VacanciesModel.findByPk(req.params.id);
    if (!vacancy) {
      return res.status(404).json({ error: "Vacancy not found" });
    }
    return res.status(200).json(vacancy);
  } catch (error) {
    console.error("Error fetching vacancy:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const createVacancy = async (req: Request, res: Response) => {
  try {
    const { title, description, salary, location, user_id } = req.body;

    if (!user_id) {
      return res.status(401).json({ error: "User not authenticated!" });
    }

    if (!title || !description || !salary || !location) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const vacancy = await VacanciesModel.create({
      title,
      description,
      salary: parseFloat(salary),
      location,
      user_id,
    });

    return res.status(201).json(vacancy);
  } catch (error) {
    console.error("Error creating vacancy:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const updateVacancy = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  try {
    const { title, description, location, salary, user_id } = req.body;

    if (!title && !description && !location && !salary && !user_id) {
      return res
        .status(400)
        .json({ error: "At least one field is required for update" });
    }

    const vacancy = await VacanciesModel.findByPk(req.params.id);
    if (!vacancy) {
      return res.status(404).json({ error: "Vacancy not found" });
    }

    if (title) vacancy.title = title;
    if (description) vacancy.description = description;
    if (location) vacancy.location = location;
    if (salary) vacancy.salary = parseFloat(salary);
    if (user_id) vacancy.user_id = user_id;

    await vacancy.save();
    return res.status(200).json(vacancy);
  } catch (error) {
    console.error("Error updating vacancy:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

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
    return res.status(200).json({ message: "Vacancy deleted successfully" });
  } catch (error) {
    console.error("Error deleting vacancy:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
