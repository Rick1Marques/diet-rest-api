import { Router } from "express";
import * as shoppingListControllers from "../controllers/shopping-list";
import { isAuth } from "../middleware/is-auth";

const router = Router();

router.post("/shopping-list", isAuth, shoppingListControllers.postShoppingList);

router.get("/shopping-lists", isAuth, shoppingListControllers.getShoppingLists);

export default router;
