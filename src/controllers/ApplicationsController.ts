import { Request, Response } from "express";
import ApplicationsModel from "../model/ApplicationsModel";

// Buscar todas as candidaturas
export const getAllApplications = async (req: Request, res: Response) => {
  try {
    const applications = await ApplicationsModel.findAll();
    res.json(applications);
  } catch (error) {
    res.status(500).json({ error: "Erro interno no servidor", details: error });
  }
};

// Criar candidatura
export const applyForVacancy = async (req: Request, res: Response) => {
  try {
    const { user_id, vacancy_id, status } = req.body;
    if (!user_id || !vacancy_id || !status) {
      return res.status(400).json({ error: "Values required" });
    }
    const application = await ApplicationsModel.create({
      user_id,
      vacancy_id,
      status,
    });
    res.status(201).json(application);
  } catch (error) {
    res.status(500).json({ error: "Erro interno no servidor", details: error });
  }
};

// Atualizar status da candidatura
export const updateApplicationStatus = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  try {
    const { status } = req.body;
    if (!status) {
      return res.status(400).json({ error: "Status is required" });
    }

    const application = await ApplicationsModel.findByPk(req.params.id);
    if (!application) {
      return res.status(404).json({ error: "Application not found" });
    }

    application.status = status;
    await application.save();
    res.status(200).json(application);
  } catch (error) {
    res.status(500).json({ error: "Erro interno no servidor", details: error });
  }
};

// Remover candidatura
export const destroyApplication = async (
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
    res.status(500).json({ error: "Erro interno no servidor", details: error });
  }
};
