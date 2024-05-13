import User from "../models/user";
import bcrypt from "bcrypt";
import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import { CustomError } from "../util/error-handling";
import jwt from "jsonwebtoken";

export const postSignup = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, email, password } = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new CustomError("Validation failed", 422, errors.array());
      throw error;
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = new User({ name: name, email: email, password: hashedPassword });
    await user.save();
    res.status(201).json({ message: "New user created!", user: user });
  } catch (error) {
    next(error);
  }
};

export const postLogin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name } = req.body;
    const user = await User.findOne({ name: name });
    const token = jwt.sign({ name: name, userId: user!._id.toString() }, "someLongSecretString", {
      expiresIn: "1h",
    });
    res.status(200).json({ token: token, userId: user!._id.toString() });
  } catch (error) {
    next(error);
  }
};
