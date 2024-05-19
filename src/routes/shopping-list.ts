import { Router } from "express";
import * as shoppingListControllers from "../controllers/shopping-list";
import { isAuth } from "../middleware/is-auth";

const router = Router();

router.post("/shopping-list", isAuth, shoppingListControllers.postShoppingList);

router.get("/shopping-lists", isAuth, shoppingListControllers.getShoppingLists);

router.get("/shopping-lists/:shoppingListId", isAuth, shoppingListControllers.getShoppingList);

router.delete(
  "/shopping-lists/:shoppingListId",
  isAuth,
  shoppingListControllers.deleteShoppingList
);

router.patch(
  "/shopping-lists/:shoppingListId/:recipeId",
  isAuth,
  shoppingListControllers.patchRecipeIntoShoppingList
);

export default router;
