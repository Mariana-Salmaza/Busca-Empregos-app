import express from "express";
import { loginUser } from "../controllers/LoginController";

const router = express.Router();

router.post("/api/auth/login", loginUser);

export default router;
