import mongoose, { Types, mongo } from "mongoose";
import { IOption, IPoll } from "../utils/mongooseTypes";

const { Schema } = mongoose;

const optionSchema = new Schema<IOption>({
  option_name: String,
  votes: {
    type: Number,
    default: 0,
  },
});

const pollSchema = new Schema<IPoll>({
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  total_votes: {
    type: Number,
    default: 0,
  },
  title: {
    type: String,
    required: [true, "Title is required!"],
    maxLength: [50, "Title Exceeded maximum length limit! "],
  },
  options: [optionSchema],
  created_at: {
    type: Date,
    default: Date.now(),
  },
});

export const Poll = mongoose.model("Poll", pollSchema);
