import { Router } from "express";
import {
  currentUserName,
  doc,
  login,
  logout,
  register,
} from "../controllers/authController";
import { checkUser, requireAuth } from "../middlewares/authMiddleware";

export const authRoutes = Router();

authRoutes.get("/", checkUser, doc);
authRoutes.post("/register", register);
authRoutes.post("/login", login);
authRoutes.get("/logout", logout);
authRoutes.get("/currentUser",  currentUserName);
