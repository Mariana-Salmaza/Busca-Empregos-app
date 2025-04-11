import { Request, Response } from "express";
import VacanciesModel from "../model/VacanciesModel";
import UserModel from "../model/UserModel";

export const createVacancy = async (req: Request, res: Response) => {
  try {
    const { title, description, location, user_id, salary } = req.body;

    if (!title || !description || !location || !user_id || !salary) {
      return res
        .status(400)
        .json({ error: "Todos os campos são obrigatórios!" });
    }

    const userId: number = parseInt(user_id);

    const user = await UserModel.findByPk(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const salaryFormatted = isNaN(Number(salary)) ? salary : String(salary);

    const newVacancy = await VacanciesModel.create({
      title,
      description,
      location,
      user_id: userId,
      salary: salaryFormatted,
    });

    return res.status(201).json(newVacancy);
  } catch (error: unknown) {
    console.error("Erro ao criar vaga:", error);

    if (error instanceof Error) {
      return res
        .status(500)
        .json({ message: "Erro interno ao criar a vaga: " + error.message });
    }

    return res
      .status(500)
      .json({ message: "Erro desconhecido ao criar a vaga." });
  }
};

export const getAllVacancies = async (req: Request, res: Response) => {
  try {
    const vacancies = await VacanciesModel.findAll();

    return res.status(200).json(vacancies);
  } catch (error: unknown) {
    console.error("Erro ao buscar vagas:", error);
    return res
      .status(500)
      .json({ message: "Erro interno ao buscar vagas.", error: error });
  }
};

export const getAllUserVacancies = async (req: Request, res: Response) => {
  console.log("[INFO] Executando controller: getAllUserVacancies");

  // todo: verificar se o userID informado no req.params.id é o mesmo que o ID do usuário que está realizando a requisição

  try {
    const userId: number = parseInt(req.params.id);

    const user = await UserModel.findByPk(userId);
    console.log("[OK] Usuário encontrado: ", user?.dataValues);
    if (!user) {
      console.log("[ERRO] Usuário não encontrado.");
      return res.status(404).json({ message: "Usuario não encontrado." });
    }

    const userVacancies = await VacanciesModel.findAll({
      where: { user_id: userId },
    });

    if (!userVacancies) {
      console.log("[ERRO] Houve um erro ao buscar as publicações de vagas.");
      return res
        .status(404)
        .json({ message: "Houve um erro ao buscar as publicações de vagas." });
    }

    if (userVacancies.length == 0) {
      console.log("[OK] O usuário ainda não possui publicações de vagas.");
      return res
        .status(204)
        .json({ message: "O usuário ainda não possui publicações de vagas." });
    }

    console.log("[OK] Publicações encontradas: ", userVacancies);

    return res.status(200).json(userVacancies);
  } catch (error: unknown) {
    console.error(
      "Erro interno ao buscar as publicações de vagas do usuário:",
      error
    );
    return res.status(500).json({
      message: "Erro interno ao buscar as publicações de vagas do usuário.",
    });
  }
};

export const getVacancyById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const vacancy = await VacanciesModel.findByPk(id);

    if (!vacancy) {
      return res
        .status(404)
        .json({ message: "Vaga não encontrada. Verifique o ID fornecido." });
    }

    return res.status(200).json(vacancy);
  } catch (error: unknown) {
    console.error("Erro ao buscar vaga:", error);
    return res.status(500).json({ message: "Erro interno ao buscar a vaga." });
  }
};

export const updateVacancy = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, description, location, salary } = req.body;
  try {
    const vacancy = await VacanciesModel.findByPk(id);

    if (!vacancy) {
      return res
        .status(404)
        .json({ message: "Vaga não encontrada. Verifique o ID fornecido." });
    }

    vacancy.title = title || vacancy.title;
    vacancy.description = description || vacancy.description;
    vacancy.location = location || vacancy.location;
    vacancy.salary = salary || vacancy.salary;

    await vacancy.save();
    return res.status(200).json({ message: "Vaga editada com sucesso!" });
  } catch (error: unknown) {
    console.error("Erro ao atualizar a vaga:", error);

    if (error instanceof Error) {
      return res.status(500).json({
        message: "Erro interno ao atualizar a vaga: " + error.message,
      });
    }

    return res
      .status(500)
      .json({ message: "Erro desconhecido ao atualizar a vaga." });
  }
};

export const destroyVacancy = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const vacancy = await VacanciesModel.findByPk(id);

    if (!vacancy) {
      return res
        .status(404)
        .json({ error: "Vaga não encontrada. Verifique o ID fornecido." });
    }

    await vacancy.destroy();
    return res.status(200).json({ message: "Vaga excluída com sucesso!" });
  } catch (error: unknown) {
    console.error("Erro ao deletar vaga:", error);
    return res.status(500).json({ message: "Erro interno ao excluir a vaga." });
  }
};
