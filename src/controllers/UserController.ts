import { Request, Response } from "express";
import UserModel from "../model/UserModel";
import bcrypt from "bcrypt";
import { AuthenticatedRequest } from "../types/custom";
import { isValidCPF } from "../validators/validateCPF";
import { isValidEmail } from "../validators/emailValidation";

export const getAll = async (req: Request, res: Response) => {
  try {
    const users = await UserModel.findAll();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Internal server error", details: error });
  }
};

export const getUserById = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  try {
    const user = await UserModel.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Internal server error", details: error });
  }
};

export const createUser = async (req: Request, res: Response) => {
  const { name, email, password, CPF } = req.body;

  try {
    if (!name || !email || !password || !CPF) {
      throw new Error("Todos os campos são obrigatórios");
    }

    if (!isValidEmail(email)) {
      throw new Error("Email inválido");
    }

    if (!isValidCPF(CPF)) {
      throw new Error("CPF inválido");
    }

    if (password.length < 6) {
      throw new Error("A senha não atende aos critérios de segurança");
    }

    const existingUser = await UserModel.findOne({ where: { email } });
    if (existingUser) {
      throw new Error("Este email já está registrado");
    }

    const newUser = await UserModel.create({
      name,
      email,
      password,
      CPF,
    });

    return res
      .status(201)
      .json({ message: "Usuário criado com sucesso", user: newUser });
  } catch (error: any) {
    console.log("Erro ao criar usuário:", error.message);
    return res
      .status(400)
      .json({ error: error.message || "Erro ao criar o usuário" });
  }
};

export const updateUser = async (req: AuthenticatedRequest, res: Response) => {
  const { name, password, CPF, email } = req.body;
  const userId = parseInt(req.params.id);
  const authenticatedUser = req.user;

  if (!authenticatedUser || authenticatedUser.id !== userId) {
    return res.status(403).json({
      error: "Você só pode atualizar a sua própria conta",
    });
  }

  if (email) {
    return res.status(400).json({
      error: "Alteração de e-mail não é permitida",
    });
  }

  try {
    const user = await UserModel.findByPk(userId);
    if (!user) {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }

    if (CPF) {
      const cpfExiste = await UserModel.findOne({ where: { CPF } });
      const cpfEmUsoPorOutro = cpfExiste && cpfExiste.id !== userId;

      if (cpfEmUsoPorOutro) {
        return res.status(400).json({
          error: "O CPF informado já está em uso",
        });
      }

      user.CPF = CPF;
    }

    if (name) user.name = name;
    if (password) user.password = await bcrypt.hash(password, 10);

    await user.save();

    return res.status(200).json({
      message: "Usuário atualizado com sucesso",
      user,
    });
  } catch (error) {
    return res.status(500).json({
      error: "Erro interno no servidor",
      details: error,
    });
  }
};

export const destroyUserById = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    const userId = parseInt(req.params.id);
    const authUser = req.user;

    if (!authUser || authUser.id !== userId) {
      return res
        .status(403)
        .json({ error: "You can only delete your own account" });
    }

    const user = await UserModel.findByPk(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    await user.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Internal server error", details: error });
  }
};
