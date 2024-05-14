import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { JwtPayload } from "jsonwebtoken";
import { CustomError } from "../util/error-handling";

declare global {
  namespace Express {
    interface Request {
      userId?: string;
    }
  }
}

export const isAuth = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.get("Authorization");
  if (!authHeader) {
    const error = new CustomError("Not authenticated", 401);
    throw error;
  }
  const token = req.get("Authorization")!.split(" ")[1];
  let decodedToken: JwtPayload;
  try {
    decodedToken = jwt.verify(token, "someLongSecretString") as JwtPayload;
  } catch (error) {
    throw error;
  }
  if (!decodedToken) {
    const error = new CustomError("Not authenticated", 401);
    throw error;
  }
  req.userId = decodedToken.userId;
  next();
};
