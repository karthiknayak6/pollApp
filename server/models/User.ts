import mongoose, { Types, Document, Model } from "mongoose";
import isEmail from "validator/lib/isEmail";
import bcrypt from "bcrypt";
import { IUser, IUserModel } from "../utils/mongooseTypes";

const { Schema } = mongoose;

const userSchema = new Schema<IUser>({
  first_name: {
    type: String,
    required: [true, "Please enter first name!"],
  },
  last_name: {
    type: String,
    required: [true, "Please enter first name!"],
  },
  email: {
    type: String,
    required: [true, "Please enter your email id!"],
    unique: true,
    lowercase: true,
    validate: [isEmail, "Please enter a valid email!"],
  },
  username: {
    type: String,
    required: [true, "Please enter your username"],
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: [true, "Please enter a password!"],
    minLength: [6, "Minimum password length is 6!"],
  },
  polls: [
    {
      type: Schema.Types.ObjectId,
      ref: "Poll",
    },
  ],
});

userSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.statics.login = async function (username: string, password: string) {
  const user = await this.findOne({ username: username });
  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      return user;
    }
    throw Error("Incorrect password");
  }
  throw Error("Incorrect email");
};

export const User = mongoose.model<IUser, IUserModel>("User", userSchema);
