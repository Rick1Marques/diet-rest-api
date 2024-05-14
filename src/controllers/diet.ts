import { Request, Response, NextFunction } from "express";
import Recipe from "../models/recipe";

export const postRecipe = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {
      title,
      category,
      ingredients,
      vegetarian,
      vegan,
      nutrition,
      instructions,
      preparationTime,
    } = req.body;

    const recipe = new Recipe({
      title: title,
      category: category,
      ingredients: ingredients,
      vegetarian: vegetarian,
      vegan: vegan,
      nutrition: nutrition,
      instructions: instructions,
      preparationTime: preparationTime,
      userId: req.userId,
    });
    await recipe.save();
    res.status(201).json({ message: "New recipe created!", recipe: recipe });
  } catch (error) {
    console.log(error);
  }
};
