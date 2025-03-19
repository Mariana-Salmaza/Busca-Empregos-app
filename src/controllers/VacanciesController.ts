import { Request, Response } from "express";
import VacanciesModel from "../model/VacanciesModel";

// Buscar todas as vagas
export const getAllVacancies = async (req: Request, res: Response) => {
  const vacancies = await VacanciesModel.findAll();
  res.send(vacancies);
};

// Buscar vaga por ID
export const getVacancyById = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  const vacancy = await VacanciesModel.findByPk(req.params.id);
  return res.json(vacancy);
};

// Criar nova vaga
export const createVacancy = async (req: Request, res: Response) => {
  try {
    const { title, description, location, salary, company_id } = req.body;
    if (!title || !description || !location || !salary || !company_id) {
      return res.status(400).json({ error: "Values required" });
    }
    const vacancy = await VacanciesModel.create({
      title,
      description,
      location,
      salary,
      company_id,
    });
    res.status(201).json(vacancy);
  } catch (error) {
    res.status(500).json("Erro interno no servidor " + error);
  }
};

// Atualizar vaga
export const updateVacancy = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  try {
    const { title, description, location, salary, company_id } = req.body;
    const vacancy = await VacanciesModel.findByPk(req.params.id);
    if (!vacancy) {
      return res.status(404).json({ error: "Vacancy not found" });
    }
    vacancy.title = title;
    vacancy.description = description;
    vacancy.location = location;
    vacancy.salary = salary;
    vacancy.company_id = company_id;
    await vacancy.save();
    res.status(200).json(vacancy);
  } catch (error) {
    res.status(500).json("Erro interno no servidor " + error);
  }
};

// Excluir vaga
export const deleteVacancyById = async (
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
    res.status(500).json("Erro interno no servidor " + error);
  }
};
