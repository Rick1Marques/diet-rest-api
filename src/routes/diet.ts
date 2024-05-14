import { Router } from "express";
import * as dietControllers from "../controllers/diet";
import { isAuth } from "../middleware/is-auth";

const router = Router();

router.post("/recipe", isAuth, dietControllers.postRecipe);

export default router;
