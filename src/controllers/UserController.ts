import { Request, Response } from "express";
import UserModel from "../model/UserModel";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/jwt";
import { AuthenticatedRequest, AuthenticatedUser } from "../types/custom";

const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const isValidCPF = (cpf: string): boolean => {
  cpf = cpf.replace(/[^\d]/g, "");
  if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;

  let sum = 0;
  let rest;

  for (let i = 1; i <= 9; i++) sum += parseInt(cpf[i - 1]) * (11 - i);
  rest = (sum * 10) % 11;
  if (rest === 10 || rest === 11) rest = 0;
  if (rest !== parseInt(cpf[9])) return false;

  sum = 0;
  for (let i = 1; i <= 10; i++) sum += parseInt(cpf[i - 1]) * (12 - i);
  rest = (sum * 10) % 11;
  if (rest === 10 || rest === 11) rest = 0;
  return rest === parseInt(cpf[10]);
};

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

  if (!name || !email || !password || !CPF) {
    return res.status(400).json({ error: "Todos os campos são obrigatórios" });
  }

  if (!isValidEmail(email)) {
    return res.status(400).json({ error: "Email inválido" });
  }

  if (!isValidCPF(CPF)) {
    return res.status(400).json({ error: "CPF inválido" });
  }

  try {
    const existingUser = await UserModel.findOne({ where: { email } });

    if (existingUser) {
      return res.status(400).json({ error: "Este email já está registrado" });
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
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Erro ao criar o usuário" });
  }
};

export const updateUser = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { name, password, CPF } = req.body;
    const userId = parseInt(req.params.id);

    const authUser = req.user;

    if (!authUser || authUser.id !== userId) {
      return res
        .status(403)
        .json({ error: "You can only update your own account" });
    }

    // esta consulta retorna um array de usuarios
    const isValidCPF = await (
      await UserModel.findAll({ where: { CPF: CPF } })
    ).length;

    // se o array tiver um tamanho igual a 0, significa que o CPF não está sendo usado por outro usuario
    if (isValidCPF != 0) {
      return res
        .status(404)
        .json({ error: "O CPF informado já está sendo utilizado." });
    }

    const user = await UserModel.findByPk(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (name) user.name = name;
    if (password) user.password = await bcrypt.hash(password, 10);
    if (CPF) user.CPF = CPF;

    await user.save();
    res.status(200).json({ message: "User updated successfully", user });
  } catch (error) {
    res.status(500).json({ error: "Internal server error", details: error });
  }
};

export const destroyUserById = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  try {
    const userId = req.params.id;

    if (req.body.user.id !== parseInt(userId)) {
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
