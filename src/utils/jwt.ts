import jwt from "jsonwebtoken";
import UserModel from "../model/UserModel";

const JWT_SECRET = process.env.JWT_SECRET || "token_de_acesso_JWT";
const JWT_EXPIRES_IN = "7d";

export const generateToken = (user: UserModel): string => {
  return jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN,
  });
};

export const verifyToken = (
  token: string
): { id: string; email: string } | null => {
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    return decoded as { id: string; email: string };
  } catch (error) {
    console.error("Erro ao verificar token:", error);
    return null;
  }
};
