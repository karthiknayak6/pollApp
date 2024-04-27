import { Request, Response, NextFunction, Router } from "express";
import { Server } from "socket.io";
import { requireAuth } from "../middlewares/authMiddleware";
import {
  checkVoteStatus,
  createNewPoll,
  fetchAllPolls,
  fetchPoll,
  issueVote,
} from "../controllers/pollController";

export const pollRoutes = (io: Server) => {
  const router = Router();

  router.post("/newPoll", requireAuth, createNewPoll);
  router.get("/poll/:pollId", fetchPoll);
  router.get("/polls", requireAuth, fetchAllPolls);
  router.get("/poll/:pollId/vote/:optionId", requireAuth, (req: Request, res: Response, next: NextFunction) => issueVote(req, res,next, io));
  router.get("/poll/:pollId/checkVoteStatus", requireAuth, (req: Request, res: Response) => checkVoteStatus(req, res));

  return router;
};
