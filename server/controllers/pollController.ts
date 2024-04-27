import { NextFunction, Request, Response } from "express";
import { ExpressError } from "../utils/ExpressError";
import { User } from "../models/User";
import { Poll } from "../models/Poll";

export const createNewPoll = async (req: Request, res: Response) => {
  const { title, options } = req.body;
  console.log(req.body);
  try {
    const currentUser = req.user;
    console.log(currentUser);
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
    const poll = await Poll.findById({ _id: pollId }).populate("author");
    console.log(poll);
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
    console.log("User POLLS: ", userPolls);
    res.json(userPolls).status(201);
  } catch (err) {
    if (err instanceof Error) throw new ExpressError(err.message, 400);
  }
};

export const issueVote = async (req: Request, res: Response,next: NextFunction, io: any) => {
  const { pollId, optionId } = req.params;
  const currentUser = req.user;

  try {
    const poll = await Poll.findById(pollId);
    if (!poll) {
      throw new ExpressError("Poll not found", 404);
    }
    if (poll.voters.includes(currentUser.id)) {
      res.json("Already voted").status(403);
      return;
    }

    const selectedOption = poll.options.find(
      (option) => option._id == optionId
    );

    if (!selectedOption) {
      throw new ExpressError("Invalid option!", 404);
    }

    selectedOption.votes += 1;
    selectedOption.OptionVoters.push(currentUser.id);
    poll.total_votes += 1;
    poll.voters.push(currentUser.id);

    await poll.save();

    io.emit("updatePoll", poll);

    res.json(poll).status(201);
  } catch (err) {
    if (err instanceof Error) throw new ExpressError(err.message, 400);
  }
};


export const checkVoteStatus = async (req: Request, res: Response) => {

  const { pollId } = req.params;
  const currentUser = req.user;
  try {
    const poll = await Poll.findById(pollId);
    if (!poll) {
      throw new ExpressError("Poll not found", 404);
    }
    if (poll.voters.includes(currentUser.id)) {
      res.json("Already voted").status(403);
      return;
    }
    res.json(poll).status(201);
  } catch (err) {
    if (err instanceof Error) throw new ExpressError(err.message, 400);
  }
}