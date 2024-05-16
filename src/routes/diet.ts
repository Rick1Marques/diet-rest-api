import { Router } from "express";
import * as dietControllers from "../controllers/diet";
import { isAuth } from "../middleware/is-auth";

const router = Router();

router.post("/recipe", isAuth, dietControllers.postRecipe);

router.get("/recipes", isAuth, dietControllers.getRecipes);

router.get("/recipes/:recipeId", isAuth, dietControllers.getRecipe);

router.put("/recipes/:recipeId", isAuth, dietControllers.putRecipe);

router.delete("/recipes/:recipeId", isAuth, dietControllers.deleteRecipe);

router.get("/recipes/user/:userId", isAuth, dietControllers.getRecipesFromUser);

export default router;
