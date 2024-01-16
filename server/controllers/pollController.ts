import { Request, Response } from "express";
import { ExpressError } from "../utils/ExpressError";
import { User } from "../models/User";
import { Poll } from "../models/Poll";
import { IPoll } from "../utils/mongooseTypes";

export const createNewPoll = async (req: Request, res: Response) => {
  const { title, options } = req.body;
  try {
    const currentUser = req.user;
    const poll = new Poll({ author: currentUser.id, title, options });
    await poll.save();
    console.log("Poll: ", poll);
    const updatedUser = await User.findByIdAndUpdate(
      currentUser.id,
      { $push: { polls: poll._id } },
      { new: true }
    );
    res.json(poll);
  } catch (err) {
    if (err instanceof Error) throw new ExpressError(err.message, 400);
  }
};

export const fetchPoll = async (req: Request, res: Response) => {
  const { pollId } = req.params;
  if (!pollId) {
    throw new ExpressError("poll id not passed!", 400);
  }
  try {
    const poll = await Poll.findById({ _id: pollId });
    res.json(poll);
  } catch (err) {
    if (err instanceof Error) throw new ExpressError(err.message, 400);
  }
};

export const fetchAllPolls = async (req: Request, res: Response) => {
  try {
    const currentUser = req.user;
    if (!currentUser) {
      throw new ExpressError("Unauthorized", 400);
    }
    const userWithPolls = await User.findById(currentUser.id).populate("polls");
    console.log("User with polls", userWithPolls);
    const userPolls = userWithPolls ? userWithPolls.polls : [];
    res.json(userPolls).status(201);
  } catch (err) {
    if (err instanceof Error) throw new ExpressError(err.message, 400);
  }
};
