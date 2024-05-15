import { Request, Response, NextFunction } from "express";
import Recipe from "../models/recipe";
import { CustomError } from "../util/error-handling";

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

    let recipe = await Recipe.findOne({ title: title });
    if (recipe?.userId.toString() === req.userId) {
      const error = new CustomError("User has already a recipe with this title", 422);
      throw error;
    }

    recipe = new Recipe({
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
    next(error);
  }
};

export const getRecipes = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const recipes = await Recipe.find();
    res.status(200).json({ message: "Feteched recipes successfully", recipes: recipes });
  } catch (error) {
    next(error);
  }
};
