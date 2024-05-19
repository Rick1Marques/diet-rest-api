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
      nutritionPerServing,
      instructions,
      preparationTime,
      servings,
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
      nutritionPerServing: nutritionPerServing,
      instructions: instructions,
      preparationTime: preparationTime,
      servings: servings,
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
    let query: any = {};

    if (req.query.title) {
      query.title = req.query.title;
    }
    if (req.query.category) {
      query.category = req.query.category;
    }
    if (req.query.vegetarian) {
      query.vegetarian = req.query.vegetarian;
    }
    if (req.query.vegan) {
      query.vegan = req.query.vegan;
    }
    if (req.query.minCalories) {
      query["nutritionPerServing.calories"] = { $gte: +req.query.minCalories };
    }
    if (req.query.maxCalories) {
      query["nutritionPerServing.calories"] = { $lte: +req.query.maxCalories };
    }
    if (req.query.maxPreparationTime) {
      query.preparationTime = { $lte: +req.query.maxPreparationTime };
    }
    if (req.query.includeIngredients) {
      const includeIngredients = (req.query.includeIngredients as string).split(",");
      query["ingredients.name"] = { $in: includeIngredients };
    }
    if (req.query.excludeIngredients) {
      const excludeIngredients = (req.query.excludeIngredients as string).split(",");
      query["ingredients.name"] = { $nin: excludeIngredients };
    }

    let sortField = (req.query.sort as string) || "title";
    if (
      sortField === "calories" ||
      sortField === "carbohydrate" ||
      sortField === "protein" ||
      sortField === "fat"
    ) {
      sortField = `nutritionPerServing.${sortField}`;
    }

    let sortOrder: 1 | -1 = req.query.order === "desc" ? -1 : 1;

    const recipes = await Recipe.find(query).sort({ [sortField]: sortOrder });

    if (recipes.length === 0) {
      const error = new CustomError("No recipes found", 422);
      throw error;
    }

    res.status(200).json({ message: "Fetched recipes successfully", recipes: recipes });
  } catch (error) {
    next(error);
  }
};

export const getRecipe = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const recipeId = req.params.recipeId;
    const recipe = await Recipe.findById(recipeId);
    if (!recipe) {
      const error = new CustomError("No recipe found", 422);
      throw error;
    }
    res.status(200).json({ message: "Fetched recipe successfully", recipe: recipe });
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
      nutritionPerServing,
      instructions,
      preparationTime,
      servings,
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
      (recipe!.nutritionPerServing = nutritionPerServing),
      (recipe!.instructions = instructions),
      (recipe!.preparationTime = preparationTime),
      (recipe!.servings = servings);
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
    res.status(200).json({ message: "Fetched recipes successfully", recipes: recipes });
  } catch (error) {
    next(error);
  }
};
