import { Request, Response } from "express";
import { ExpressError } from "../utils/ExpressError";
import { User } from "../models/User";
import jwt from "jsonwebtoken";
import { ObjectId, Types } from "mongoose";

export const doc = (req: Request, res: Response) => {
  console.log("Hey doc");

  res.send("Check console");
};
const maxAge = 3 * 24 * 60 * 60;

const createToken = (id: Types.ObjectId) => {
  const secret = process.env.JWT_SECRET;
  if (secret) {
    return jwt.sign({ id }, secret, { expiresIn: maxAge });
  } else {
    console.log("secret is not provided from env");
  }
};

export const register = async (req: Request, res: Response) => {
  try {
    const { first_name, last_name, email, username, password } = req.body;
    const user = new User({ first_name, last_name, email, username, password });
    await user.save();
    const token = createToken(user._id);
    res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(201).json(user);
  } catch (err) {
    if (err instanceof Error) throw new ExpressError(err.message, 400);
  }
};

export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  try {
    const user = await User.login(username, password);
    const token = createToken(user._id);
    res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(200).json({ user: user._id });
  } catch (err) {
    if (err instanceof Error) throw new ExpressError(err.message, 400);
  }
};

export const logout = (req: Request, res: Response) => {
  res.cookie("jwt", "", { maxAge: 1 });
  res.json("Logged out!");
};
