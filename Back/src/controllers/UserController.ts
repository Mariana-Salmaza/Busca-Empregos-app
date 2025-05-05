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

    const newUser = await UserModel.create({ name, email, password, CPF });

    return res.status(201).json({
      message: "Usuário criado com sucesso",
      user: newUser,
    });
  } catch (error: any) {
    console.error("Erro ao criar usuário:", error.message);
    return res.status(400).json({
      error: error.message || "Erro ao criar o usuário",
    });
  }
};

export const updateUser = async (req: AuthenticatedRequest, res: Response) => {
  const { name, email, password, newPassword, CPF } = req.body;
  const userId = parseInt(req.params.id, 10);
  const authenticatedUser = req.user;

  if (!authenticatedUser || authenticatedUser.id !== userId) {
    return res.status(403).json({
      error: "Você só pode atualizar a sua própria conta",
    });
  }

  try {
    const user = await UserModel.findByPk(userId);
    if (!user) {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }

    if (name) user.name = name;

    if (newPassword && password) {
      if (typeof newPassword !== "string" || typeof password !== "string") {
        return res.status(400).json({ error: "Senha inválida" });
      }
      if (!user.password) {
        return res.status(400).json({ error: "Senha atual não encontrada" });
      }

      const isPasswordCorrect = await bcrypt.compare(password, user.password);
      if (!isPasswordCorrect) {
        return res.status(400).json({ error: "Senha atual incorreta" });
      }

      if (newPassword.length < 6) {
        return res.status(400).json({
          error: "A nova senha deve ter pelo menos 6 caracteres",
        });
      }

      const hashedPassword = await bcrypt.hash(newPassword, 10);
      user.password = hashedPassword;
    }

    if (email) {
      if (!isValidEmail(email)) {
        return res.status(400).json({ error: "Email inválido" });
      }

      const existingEmail = await UserModel.findOne({ where: { email } });
      if (existingEmail && existingEmail.id !== userId) {
        return res.status(400).json({ error: "Este e-mail já está em uso" });
      }

      user.email = email;
    }

    if (CPF) {
      if (!isValidCPF(CPF)) {
        return res.status(400).json({ error: "CPF inválido" });
      }

      const cpfExistente = await UserModel.findOne({ where: { CPF } });
      if (cpfExistente && cpfExistente.id !== userId) {
        return res
          .status(400)
          .json({ error: "O CPF informado já está em uso" });
      }

      user.CPF = CPF;
    }

    await user.save();

    return res.status(200).json({
      message: "Usuário atualizado com sucesso",
      user: {
        id: user.id,
        name: user.name,
        CPF: user.CPF,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Erro ao atualizar usuário:", error);
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
      return res.status(403).json({
        error: "Você só pode excluir a sua própria conta",
      });
    }

    const user = await UserModel.findByPk(userId);
    if (!user) {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }

    await user.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({
      error: "Erro interno no servidor",
      details: error,
    });
  }
};
