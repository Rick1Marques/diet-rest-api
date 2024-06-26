"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const shoppingListControllers = __importStar(require("../controllers/shopping-list"));
const is_auth_1 = require("../middleware/is-auth");
const router = (0, express_1.Router)();
router.post("/shopping-list", is_auth_1.isAuth, shoppingListControllers.postShoppingList);
router.get("/shopping-lists", is_auth_1.isAuth, shoppingListControllers.getShoppingLists);
router.get("/shopping-lists/:shoppingListId", is_auth_1.isAuth, shoppingListControllers.getShoppingList);
router.delete("/shopping-lists/:shoppingListId", is_auth_1.isAuth, shoppingListControllers.deleteShoppingList);
router.patch("/shopping-lists/:shoppingListId/:recipeId", is_auth_1.isAuth, shoppingListControllers.patchRecipeIntoShoppingList);
exports.default = router;
