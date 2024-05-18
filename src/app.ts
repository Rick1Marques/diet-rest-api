import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { Request, Response, NextFunction } from "express";

import { errorHandler } from "./middleware/error-handler";
import authRouter from "./routes/auth";
import dietRouter from "./routes/diet";
import shoppingListRouter from "./routes/shopping-list";

dotenv.config();

const app = express();

app.use(bodyParser.json());
app.use((req: Request, res: Response, next: NextFunction) => {
  res.setHeader("Acess-Control-Allow-Orign", "*");
  res.setHeader("Acess-Control-Allow-Methods", "OPTIONS, GET, POST, PUT, PATCH, DELETE");
  res.setHeader("Acess-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use("/auth", authRouter);
app.use("/diet", dietRouter);
app.use("/shopping-list", shoppingListRouter);
app.use(errorHandler);

const startServer = async () => {
  try {
    const dbURL: string = process.env.DATABASE_URL || "";
    await mongoose.connect(dbURL);
    app.listen(3000);
  } catch (error) {
    console.log(error);
  }
};

startServer();
