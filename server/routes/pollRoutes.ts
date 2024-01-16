import { Router } from "express";
import { requireAuth } from "../middlewares/authMiddleware";
import {
  createNewPoll,
  fetchAllPolls,
  fetchPoll,
} from "../controllers/pollController";

export const pollRoutes = Router();

pollRoutes.post("/newPoll", requireAuth, createNewPoll);
pollRoutes.get("/poll/:pollId", requireAuth, fetchPoll);
pollRoutes.get("/polls", requireAuth, fetchAllPolls);
