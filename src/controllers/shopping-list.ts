import { Request, Response, NextFunction } from "express";
import ShoppingList from "../models/shopping-list";
import { CustomError } from "../util/error-handling";
import shoppingList from "../models/shopping-list";

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

export const getShoppingLists = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const shoppingLists = await ShoppingList.find({ userId: req.userId });
    if (shoppingList.length === 0) {
      const error = new CustomError("No shopping lists found from this user", 422);
      throw error;
    }
    res
      .status(200)
      .json({ message: "Feteched shopping lists successfully", shoppingLists: shoppingLists });
  } catch (error) {
    next(error);
  }
};
