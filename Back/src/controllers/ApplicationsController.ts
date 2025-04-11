import { Request, Response } from "express";
import ApplicationsModel from "../model/ApplicationsModel";

export const createApplication = async (req: Request, res: Response) => {
  try {
    const { user_id, vacancy_id, status } = req.body;
    const newApplication = await ApplicationsModel.create({
      user_id,
      vacancy_id,
      status,
    });
    res.status(201).json(newApplication);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao criar a candidatura" });
  }
};

export const getAllApplications = async (req: Request, res: Response) => {
  try {
    const applications = await ApplicationsModel.findAll();
    res.status(200).json(applications);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao buscar candidaturas" });
  }
};

export const getApplicationById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const application = await ApplicationsModel.findByPk(id);
    if (!application) {
      return res.status(404).json({ message: "Candidatura não encontrada." });
    }
    res.status(200).json(application);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao buscar candidatura." });
  }
};

export const updateApplication = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { status } = req.body;
  try {
    const application = await ApplicationsModel.findByPk(id);
    if (!application) {
      return res.status(404).json({ message: "Candidatura não encontrada." });
    }

    application.status = status || application.status;

    await application.save();
    res.status(200).json(application);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao atualizar candidatura." });
  }
};

export const destroyApplication = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const application = await ApplicationsModel.findByPk(id);
    if (!application) {
      return res.status(404).json({ message: "Candidatura não encontrada." });
    }
    await application.destroy();
    res.status(200).json({ message: "Candidatura deletada com sucesso." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao deletar candidatura." });
  }
};
