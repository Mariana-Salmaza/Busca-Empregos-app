import { Request } from "express";

export interface AuthenticatedUser {
  id: number;
  name: string;
  email: string;
  CPF: number;
  password: string;
}

export interface AuthenticatedRequest extends Request {
  user?: AuthenticatedUser;
}
