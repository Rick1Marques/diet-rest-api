import { Router } from "express";
import * as shoppingListControllers from "../controllers/shopping-list";
import { isAuth } from "../middleware/is-auth";

const router = Router();

router.post("/shopping-list", isAuth, shoppingListControllers.postShoppingList);

router.get("/shopping-lists", isAuth, shoppingListControllers.getShoppingLists);

router.get("/shopping-lists/:shoppingListId", isAuth, shoppingListControllers.getShoppingList);

export default router;
