import { Router } from "express";
import * as dietControllers from "../controllers/diet";
import { isAuth } from "../middleware/is-auth";

const router = Router();

router.post("/recipe", isAuth, dietControllers.postRecipe);

router.get("/recipes", isAuth, dietControllers.getRecipes);

export default router;
