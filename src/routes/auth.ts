import { Router } from "express";
import * as authControllers from "../controllers/auth";
import { check } from "express-validator";
import User from "../models/user";

const router = Router();

router.post(
  "/signup",
  [
    check("name")
      .isAlphanumeric()
      .withMessage("Name must countain only alphanumeric characters")
      .custom(async (value, { req }) => {
        const user = await User.findOne({ name: value });
        if (user) {
          return Promise.reject("Name is already in use");
        }
      }),
    check("email")
      .isEmail()
      .withMessage("Email is already in use")
      .custom(async (value, { req }) => {
        const userEmail = await User.findOne({ email: value });
        if (userEmail) {
          return Promise.reject("Email exists already");
        }
      }),
    check("password")
      .isLength({ min: 8 })
      .withMessage("Password must be at least 8 characters long")
      .matches(/[A-Z]/)
      .withMessage("Password must contain at least one uppercase letter")
      .matches(/[0-9]/)
      .withMessage("Password must contain at least one number")
      .matches(/[$&+,:;=?@#|'<>.^*()%!-]/)
      .withMessage("Password must contain at least one symbol"),
  ],
  authControllers.postSignup
);

export default router;
