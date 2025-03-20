import { Request, Response } from "express";
import VacanciesModel from "../model/VacanciesModel";

// Buscar todas as vagas
export const getAllVacancies = async (req: Request, res: Response) => {
  try {
    const vacancies = await VacanciesModel.findAll();
    res.json(vacancies);
  } catch (error) {
    res.status(500).json({ error: "Erro interno no servidor", details: error });
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
    res.status(500).json({ error: "Erro interno no servidor", details: error });
  }
};

// Criar nova vaga
export const createVacancy = async (req: Request, res: Response) => {
  try {
    const { title, description, salary, location, user_id } = req.body;

    if (!user_id) {
      return res.status(400).json({ message: "Usuário não autenticado!" });
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
    console.error("Erro ao criar vaga:", error);
    return res.status(500).json({ message: "Erro interno no servidor" });
  }
};

// Atualizar vaga
export const updateVacancy = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  try {
    const { title, description, location, salary, user_id } = req.body; // user_id agora correto

    const vacancy = await VacanciesModel.findByPk(req.params.id);
    if (!vacancy) {
      return res.status(404).json({ error: "Vacancy not found" });
    }

    vacancy.title = title;
    vacancy.description = description;
    vacancy.location = location;
    vacancy.salary = salary;
    vacancy.user_id = user_id;

    await vacancy.save();
    res.status(200).json(vacancy);
  } catch (error) {
    res.status(500).json({ error: "Erro interno no servidor", details: error });
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
    res.status(500).json({ error: "Erro interno no servidor", details: error });
  }
};
