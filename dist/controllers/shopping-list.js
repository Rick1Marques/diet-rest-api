"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.patchRecipeIntoShoppingList = exports.deleteShoppingList = exports.getShoppingList = exports.getShoppingLists = exports.postShoppingList = void 0;
const error_handling_1 = require("../util/error-handling");
const shopping_list_1 = __importDefault(require("../models/shopping-list"));
const recipe_1 = __importDefault(require("../models/recipe"));
const postShoppingList = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title } = req.body;
        let shoppingList = yield shopping_list_1.default.findOne({ title: title });
        if ((shoppingList === null || shoppingList === void 0 ? void 0 : shoppingList.userId.toString()) === req.userId) {
            const error = new error_handling_1.CustomError("Title is already in use", 422);
            throw error;
        }
        shoppingList = new shopping_list_1.default({
            title: title,
            ingredients: [],
            userId: req.userId,
        });
        shoppingList.save();
        res.status(201).json({ message: "Shopping list created", shoppingList: shoppingList });
    }
    catch (error) {
        next(error);
    }
});
exports.postShoppingList = postShoppingList;
const getShoppingLists = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const shoppingLists = yield shopping_list_1.default.find({ userId: req.userId });
        if (shoppingLists.length === 0) {
            const error = new error_handling_1.CustomError("No shopping lists found from this user", 422);
            throw error;
        }
        res
            .status(200)
            .json({ message: "Fetched shopping lists successfully", shoppingLists: shoppingLists });
    }
    catch (error) {
        next(error);
    }
});
exports.getShoppingLists = getShoppingLists;
const getShoppingList = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const shoppingListId = req.params.shoppingListId;
        const shoppingList = yield shopping_list_1.default.findById(shoppingListId);
        if (!shoppingList) {
            const error = new error_handling_1.CustomError("No shopping list found", 422);
            throw error;
        }
        res.status(200).json({ message: "Fetched shopping list", shoppingList: shoppingList });
    }
    catch (error) {
        next(error);
    }
});
exports.getShoppingList = getShoppingList;
const deleteShoppingList = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const shoppingListId = req.params.shoppingListId;
        yield shopping_list_1.default.findByIdAndDelete(shoppingListId);
        res.status(200).json({ message: "Shopping list deleted" });
    }
    catch (error) {
        next(error);
    }
});
exports.deleteShoppingList = deleteShoppingList;
const patchRecipeIntoShoppingList = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const shoppingListId = req.params.shoppingListId;
        const recipeId = req.params.recipeId;
        const recipe = yield recipe_1.default.findById(recipeId);
        const shoppingList = yield shopping_list_1.default.findById(shoppingListId);
        recipe.ingredients.forEach((recipeIngredient) => {
            const existingIngredient = shoppingList === null || shoppingList === void 0 ? void 0 : shoppingList.ingredients.find((shoppingIngredient) => shoppingIngredient.name === recipeIngredient.name &&
                shoppingIngredient.unit === recipeIngredient.unit);
            if (existingIngredient) {
                existingIngredient.quantity += recipeIngredient.quantity;
            }
            else {
                shoppingList === null || shoppingList === void 0 ? void 0 : shoppingList.ingredients.push({
                    name: recipeIngredient.name,
                    quantity: recipeIngredient.quantity,
                    unit: recipeIngredient.unit,
                });
            }
        });
        yield shoppingList.save();
        res.status(200).json({ message: "Shopping list was updated", shoppingList: shoppingList });
    }
    catch (error) {
        next(error);
    }
});
exports.patchRecipeIntoShoppingList = patchRecipeIntoShoppingList;
