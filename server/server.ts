import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import { authRoutes } from "./routes/authRoutes";

const app = express();
dotenv.config();
const port = process.env.PORT;

app.use(express.json());
app.use(cookieParser());

const dbURI = "mongodb://127.0.0.1:27017/pollApp";

const connectDB = async () => {
  try {
    await mongoose.connect(dbURI, {});
    console.log("Connected to MongoDB");
  } catch (error) {
    if (error instanceof Error) {
      console.log("Error connecting to MongoDB:", error.message);
    } else {
      console.log("Unknown error connecting to MongoDB");
    }
  }
};

connectDB();

app.use("/", authRoutes);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
