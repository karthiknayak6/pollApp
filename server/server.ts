import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import { Server } from "http";
import { Socket } from "socket.io";
import { authRoutes } from "./routes/authRoutes";
import { pollRoutes } from "./routes/pollRoutes";
import { ExpressError } from "./utils/ExpressError";
import cors from "cors";
import { createServer } from "http";

const app = express();
dotenv.config();
const port = process.env.PORT;
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(express.json());
app.use(cookieParser());

const server = createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:3000",
  },
});

io.on("connection", (socket: Socket) => {
  console.log("New client connected");

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

const dbURI = process.env.MONGO_URI;

const connectDB = async () => {
  try {
    console.log(dbURI);
    if (typeof dbURI === "string") {
      await mongoose.connect(dbURI, {});
    } else {
      throw new ExpressError("Invalid Mongo URI!!", 400);
    }
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
app.use("/", pollRoutes(io)); 
app.use("/", authRoutes); 

server.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
