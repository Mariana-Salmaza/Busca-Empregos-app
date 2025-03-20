import { Request, Response } from "express";
import ApplicationsModel from "../model/ApplicationsModel";
import UserModel from "../model/UserModel";
import VacancyModel from "../model/VacanciesModel";

// Buscar todas as candidaturas
export const getAllApplications = async (req: Request, res: Response) => {
  try {
    const applications = await ApplicationsModel.findAll({
      include: ["User", "Vacancy"],
    });

    res.json({ success: true, data: applications });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error fetching applications" });
  }
};

// Criar candidatura
export const applyForVacancy = async (req: Request, res: Response) => {
  try {
    const { user_id, vacancy_id, status } = req.body;

    if (!user_id || !vacancy_id || !status) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    // Verifica se usuário e vaga existem em uma única consulta para otimizar performance
    const [user, vacancy] = await Promise.all([
      UserModel.findByPk(user_id),
      VacancyModel.findByPk(vacancy_id),
    ]);

    if (!user)
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    if (!vacancy)
      return res
        .status(404)
        .json({ success: false, message: "Vacancy not found" });

    // Verifica se já existe uma candidatura para essa vaga
    const existingApplication = await ApplicationsModel.findOne({
      where: { user_id, vacancy_id },
    });
    if (existingApplication) {
      return res.status(400).json({
        success: false,
        message: "Application already exists for this vacancy",
      });
    }

    // Criação da candidatura
    const application = await ApplicationsModel.create({
      user_id,
      vacancy_id,
      status,
    });

    res.status(201).json({
      success: true,
      data: application,
      message: "Application created successfully",
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error creating application" });
  }
};

// Atualizar status da candidatura
export const updateApplicationStatus = async (req: Request, res: Response) => {
  try {
    const { status } = req.body;
    const { id } = req.params;

    if (!status) {
      return res
        .status(400)
        .json({ success: false, message: "Status is required" });
    }

    const application = await ApplicationsModel.findByPk(id);
    if (!application) {
      return res
        .status(404)
        .json({ success: false, message: "Application not found" });
    }

    application.status = status;
    await application.save();

    res.status(200).json({
      success: true,
      data: application,
      message: "Application status updated successfully",
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error updating application status" });
  }
};

// Remover candidatura
export const destroyApplication = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const application = await ApplicationsModel.findByPk(id);
    if (!application) {
      return res
        .status(404)
        .json({ success: false, message: "Application not found" });
    }

    await application.destroy();
    res
      .status(200)
      .json({ success: true, message: "Application deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error deleting application" });
  }
};
