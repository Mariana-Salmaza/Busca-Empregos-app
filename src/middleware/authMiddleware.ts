import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import { verifyToken } from "../utils/jwt";
import { AuthenticatedRequest, AuthenticatedUser } from "../types/custom";

export const authMiddleware = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({ error: "Access denied. No token provided" });
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET!
    ) as AuthenticatedUser;
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ error: "Access denied. Invalid token" });
  }
};
