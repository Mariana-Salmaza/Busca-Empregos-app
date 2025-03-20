import { Request, Response } from "express";
import UserModel from "../model/UserModel";
import { Error } from "sequelize";

// Buscar todos os usuários
export const getAll = async (req: Request, res: Response) => {
  try {
    const users = await UserModel.findAll();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Erro interno no servidor", details: error });
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
    res.status(500).json({ error: "Erro interno no servidor", details: error });
  }
};

// Criar novo usuário
export const createUser = async (req: Request, res: Response) => {
  try {
    console.log("Recebendo requisição:", req.body);
    const { name, email, password, CPF } = req.body;

    // Validando campos obrigatórios
    if (!name || !email || !password || !CPF) {
      return res
        .status(400)
        .json({ error: "Todos os campos são obrigatórios" });
    }

    // Verificando se o CPF já está cadastrado
    const existingUser = await UserModel.findOne({ where: { CPF } });
    if (existingUser) {
      return res.status(400).json({ error: "CPF já cadastrado" });
    }

    const newUser = await UserModel.create({ name, email, password, CPF });
    console.log("Usuário criado:", newUser);
    res.status(201).json(newUser);
  } catch (error) {
    console.error("Erro ao criar usuário:", error);
    res.status(500).json({ error: "Erro ao criar usuário" });
  }
};

// Atualizar usuário
export const updateUser = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  try {
    const { name, email, password } = req.body;
    const loggedUser = req.body.user; // Pegando o usuário logado

    console.log("Usuário logado:", loggedUser);

    if (!name || !email || !password) {
      return res.status(400).json({ error: "Values required" });
    }

    const user = await UserModel.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    user.name = name;
    user.email = email;
    user.password = password;
    user.updatedBy = loggedUser?.id;

    await user.save();
    res.status(200).json(user);
  } catch (error) {
    console.error("Erro ao atualizar usuário:", error);
    res.status(500).json({ error: "Erro interno no servidor", details: error });
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
    res.status(500).json({ error: "Erro interno no servidor", details: error });
  }
};
