import { Request, Response, NextFunction, Router } from "express";
import { Server } from "socket.io";
import { requireAuth } from "../middlewares/authMiddleware";
import {
  createNewPoll,
  fetchAllPolls,
  fetchPoll,
  issueVote,
} from "../controllers/pollController";

export const pollRoutes = (io: Server) => {
  const router = Router();

  router.post("/newPoll", requireAuth, createNewPoll);
  router.get("/poll/:pollId", requireAuth, fetchPoll);
  router.get("/polls", requireAuth, fetchAllPolls);
  router.get("/poll/:pollId/vote/:optionId", requireAuth, (req: Request, res: Response, next: NextFunction) => issueVote(req, res,next, io));

  return router;
};
