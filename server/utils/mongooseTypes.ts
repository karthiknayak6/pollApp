import { Types, Document, Model } from "mongoose";

export interface IOption {
  option_name: string;
  votes: number;
}
export interface IPoll {
  author: Types.ObjectId;
  total_votes: number;
  title: string;
  options: [IOption];
  created_at: Date;
}
export interface IUser extends Document {
  first_name: string;
  last_name: string;
  email: string;
  username: string;
  password: string;
  polls: [Types.ObjectId];
}
export interface IUserModel extends Model<IUser> {
  login(username: string, password: string): Promise<IUser>;
}
