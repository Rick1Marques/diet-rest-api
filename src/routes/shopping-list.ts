import { Router } from "express";
import * as shoppingListControllers from "../controllers/shopping-list";
import { isAuth } from "../middleware/is-auth";

const router = Router();

router.post("shopping-list", isAuth, shoppingListControllers.postShoppingList);

export default router;
