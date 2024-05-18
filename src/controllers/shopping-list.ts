import { Request, Response, NextFunction } from "express";
import ShoppingList from "../models/shopping-list";
import { CustomError } from "../util/error-handling";

export const postShoppingList = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { titel } = req.body;

    let shoppingList = await ShoppingList.findOne({ title: titel });

    if (shoppingList?.userId.toString() === req.userId) {
      const error = new CustomError("Title is already in use", 422);
      throw error;
    }

    shoppingList = new ShoppingList({
      title: titel,
      ingredients: [],
      userId: req.userId,
    });

    shoppingList.save();
    res.status(201).json({ message: "Shopping list created", shoppingList: shoppingList });
  } catch (error) {
    next(error);
  }
};
