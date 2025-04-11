import { Request, Response } from "express";
import UserModel from "../model/UserModel";
import { generateToken } from "../utils/jwt";

export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email e senha são obrigatórios" });
  }
  const user = await UserModel.findOne({ where: { email } });

  if (!user) {
    console.log("Usuário não encontrado com o e-mail:", email);
    return res.status(404).json({ error: "Usuário não encontrado" });
  }

  if (!user) {
    return res.status(404).json({ error: "Usuário não encontrado" });
  }

  const isValidPassword = await user.validatePassword(password);

  if (!isValidPassword) {
    return res.status(400).json({ error: "Email ou senha inválidos" });
  }

  const token = generateToken(user);

  return res
    .status(200)
    .json({ message: "Login realizado com sucesso", token, userId: user.id });
};
