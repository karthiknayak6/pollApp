import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { ExpressError } from "../utils/ExpressError";
export const checkUser = (req: Request, res: Response, next: NextFunction) => {
  console.log("user checked!!");
  next();
};

export const requireAuth = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies.jwt;
  try {
    const decodedToken = jwt.verify(token, "secret");
    next();
  } catch (err) {
    if (err instanceof Error) throw new ExpressError(err.message, 400);
  }
};
