import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
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
  const secret = process.env.JWT_SECRET;
  const token = req.cookies.jwt;
  if (!token) {
    res.json({ message: "Unauthorized" });
    return;
  }
  console.log("TOKEENNNNNNN: ", token);
  try {
    if (secret) {
      const decodedToken = jwt.verify(token, secret);
      req.user = decodedToken;
    } else {
      console.log("secret is not provided from env!");
    }
    next();
  } catch (err) {
      res.status(401).json({ message: "Invalid token" }); // Send a response instead of throwing an error
    }
  
};
