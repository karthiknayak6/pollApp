import { Request, Response } from "express";
import { ExpressError } from "../utils/ExpressError";
import { User } from "../models/User";
import jwt from "jsonwebtoken";
import { MongooseError, ObjectId, Types } from "mongoose";
import { error } from "console";

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

const handleErrors = (err: any) => {
  console.log("err", err);
  console.log("err.message: ", err.message, "err.code: ", err.code);
  let errors: any = { username: "", email: "", password: "" };

  if (err.message === "Incorrect username") {
    errors.username = "That username is not registered";
  }
  if (err.message === "Incorrect password") {
    errors.password = "That password is incorrect";
  }
  if (err.code === 11000) {
    if (err.message.includes("email")) {
      errors.email = "that email is already registered";
    }

    if (err.message.includes("username")) {
      errors.username = "that username is already registered";
    }
    return errors;
  }
  if (err.message.includes("user validation failed")) {
    Object.values(err.errors).forEach(({ properties }: any) => {
      errors[properties.path] = properties.message;
    });
  }
  return errors;
};

export const isLoggedIn = async (req: Request, res: Response) => {};

export const register = async (req: Request, res: Response) => {
  try {
    const { f_name, l_name, email, username, password } = req.body;
    const user = new User({
      first_name: f_name,
      last_name: l_name,
      email,
      username,
      password,
    });
    await user.save();
    const token = createToken(user._id);
    res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(201).json(user);
  } catch (err: any) {
    const errors = handleErrors(err);
    console.log("ERRORS: ", errors);
    res.json({ errors });
  }
};

export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  try {
    const user = await User.login(username, password);
    const token = createToken(user._id);
    console.log(token);
    res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(200).json({ user: user._id });
  } catch (err) {
    const errors = handleErrors(err);
    console.log("ERRORS: ", errors);
    res.json({ errors });
  }
};

export const logout = (req: Request, res: Response) => {
  res.cookie("jwt", "", { maxAge: 1 });
  res.json("Logged out!");
};

export const currentUserName = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.user.id);
    console.log("CURR", user);

    if (user) {
      res.json(user.first_name);
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (err) {
    console.error("Error retrieving user data:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
