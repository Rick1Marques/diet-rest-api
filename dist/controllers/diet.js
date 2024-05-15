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
exports.getRecipes = exports.postRecipe = void 0;
const recipe_1 = __importDefault(require("../models/recipe"));
const error_handling_1 = require("../util/error-handling");
const postRecipe = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, category, ingredients, vegetarian, vegan, nutrition, instructions, preparationTime, } = req.body;
        let recipe = yield recipe_1.default.findOne({ title: title });
        if ((recipe === null || recipe === void 0 ? void 0 : recipe.userId.toString()) === req.userId) {
            const error = new error_handling_1.CustomError("User has already a recipe with this title", 422);
            throw error;
        }
        recipe = new recipe_1.default({
            title: title,
            category: category,
            ingredients: ingredients,
            vegetarian: vegetarian,
            vegan: vegan,
            nutrition: nutrition,
            instructions: instructions,
            preparationTime: preparationTime,
            userId: req.userId,
        });
        yield recipe.save();
        res.status(201).json({ message: "New recipe created!", recipe: recipe });
    }
    catch (error) {
        next(error);
    }
});
exports.postRecipe = postRecipe;
const getRecipes = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const recipes = yield recipe_1.default.find();
        res.status(200).json({ message: "Feteched recipes successfully", recipes: recipes });
    }
    catch (error) {
        next(error);
    }
});
exports.getRecipes = getRecipes;
