import { Request, Response } from "express";
import ApplicationsModel from "../model/ApplicationsModel";

// método que busca todos
export const getAll = async (req: Request, res: Response) => {
  const applications = await ApplicationsModel.findAll();
  res.send(applications);
};

// método que busca por id
export const getApplicationById = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  const application = await ApplicationsModel.findByPk(req.params.id);
  return res.json(application);
};

// método que cria uma nova aplicação
export const createApplication = async (req: Request, res: Response) => {
  try {
    const { user_id, vacancy_id, applied_at } = req.body;

    if (!user_id || !vacancy_id || !applied_at) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const application = await ApplicationsModel.create({ user_id, vacancy_id, applied_at });
    res.status(201).json(application);
  } catch (error) {
    res.status(500).json("Erro interno no servidor " + error);
  }
};

// método que atualiza uma aplicação
export const updateApplication = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  try {
    const { user_id, vacancy_id, applied_at } = req.body;

    const application = await ApplicationsModel.findByPk(req.params.id);
    if (!application) {
      return res.status(404).json({ error: "Application not found" });
    }

    application.user_id = user_id;
    application.vacancy_id = vacancy_id;

    await application.save();
    res.status(201).json(application);
  } catch (error) {
    res.status(500).json("Erro interno no servidor " + error);
  }
};

// método que destrói
export const destroyApplicationById = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  try {
    const application = await ApplicationsModel.findByPk(req.params.id);
    if (!application) {
      return res.status(404).json({ error: "Application not found" });
    }

    await application.destroy();

    res.status(204).send();
  } catch (error) {
    res.status(500).json("Erro interno no servidor " + error);
  }
};
