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

export const getRecipe = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const recipeId = req.params.recipeId;
    const recipe = await Recipe.findById(recipeId);
    res.status(200).json({ message: "Feteched recipe successfully", recipe: recipe });
  } catch (error) {
    next(error);
  }
};

export const putRecipe = async (req: Request, res: Response, next: NextFunction) => {
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

    const recipeId = req.params.recipeId;
    let recipe = await Recipe.findById(recipeId);

    if (recipe?.userId.toString() !== req.userId) {
      const error = new CustomError("Not authorized", 403);
      throw error;
    }

    (recipe!.title = title),
      (recipe!.category = category),
      (recipe!.ingredients = ingredients),
      (recipe!.vegetarian = vegetarian),
      (recipe!.vegan = vegan),
      (recipe!.nutrition = nutrition),
      (recipe!.instructions = instructions),
      (recipe!.preparationTime = preparationTime),
      recipe!.save();

    res.status(200).json({ message: "Recipe updated", recipe: recipe });
  } catch (error) {
    next(error);
  }
};

export const deleteRecipe = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const recipeId = req.params.recipeId;
    let recipe = await Recipe.findById(recipeId);
    if (recipe?.userId.toString() !== req.userId) {
      const error = new CustomError("Not authorized", 403);
      throw error;
    }
    await Recipe.findByIdAndDelete(recipeId);
    res.status(200).json({ message: "Recipe deleted" });
  } catch (error) {
    next(error);
  }
};

export const getRecipesFromUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.params.userId;
    const recipes = await Recipe.find({ userId: userId });
    if (recipes.length === 0) {
      const error = new CustomError("No recipes found from this user", 422);
      throw error;
    }
    res.status(200).json({ message: "Feteched recipes successfully", recipes: recipes });
  } catch (error) {
    next(error);
  }
};
