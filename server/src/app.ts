import express, { Application, Request, Response, NextFunction } from "express";
import cors from "cors";
import userRoutes from "./routes/userRoutes";
import { PrismaClient } from "@prisma/client";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import session from "express-session";

const app = express();

const key = process.env.SESSION_KEY;
const time = 360000000;

let sessionOptions = {
  secret: key as string,
  resave: true,
  saveUninitialized: true,
  cookie: {
    secure: false,
  },
};
if (app.get("env") === "production") {
  app.set("trust proxy", 1); // trust first proxy
  sessionOptions.cookie.secure = true; // serve secure cookies
}

app.use(session(sessionOptions));
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());

app.use("/", userRoutes);

app.listen(5000, () => console.log("Server running on port 5000"));
