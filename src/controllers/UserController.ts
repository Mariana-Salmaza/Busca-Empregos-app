import { Request, Response } from "express";
import UserModel from "../model/UserModel";
import { Error } from "sequelize";

// Buscar todos os usuários
export const getAll = async (req: Request, res: Response) => {
  try {
    const users = await UserModel.findAll();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Internal server error", details: error });
  }
};

// Buscar usuário por ID
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

// Criar novo usuário
export const createUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password, CPF } = req.body;

    // Validando campos obrigatórios
    if (!name || !email || !password || !CPF) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Verificando se o CPF já está cadastrado
    const existingUser = await UserModel.findOne({ where: { CPF } });
    if (existingUser) {
      return res.status(400).json({ error: "CPF already registered" });
    }

    const newUser = await UserModel.create({ name, email, password, CPF });
    console.log("User created:", newUser);
    res.status(201).json(newUser);
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Error creating user" });
  }
};

// Atualizar usuário
export const updateUser = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  try {
    console.log("Body received:", req.body);

    const { name, email, password } = req.body;
    const loggedUser = req.body.user;

    console.log("Logged in user:", loggedUser);

    if (!name && !email && !password) {
      return res.status(400).json({ error: "At least one field is required" });
    }

    const user = await UserModel.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (name) user.name = name;
    if (email) user.email = email;
    if (password) user.password = password;
    user.updatedBy = loggedUser?.id;

    await user.save();
    res.status(200).json(user);
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ error: "Internal server error", details: error });
  }
};

// Excluir usuário
export const destroyUserById = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  try {
    const user = await UserModel.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    await user.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Internal server error", details: error });
  }
};
