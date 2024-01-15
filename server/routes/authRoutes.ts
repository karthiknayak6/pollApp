import { Router } from "express";
import { doc, login, logout, register } from "../controllers/authController";
export const authRoutes = Router();
import { checkUser, requireAuth } from "../middlewares/authMiddleware";

authRoutes.get("/", checkUser, requireAuth, doc);
authRoutes.post("/register", register);
authRoutes.post("/login", login);
authRoutes.get("/logout", logout);
