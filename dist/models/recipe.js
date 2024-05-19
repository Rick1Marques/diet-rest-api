"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const mongoose_2 = require("mongoose");
const recipeSchema = new mongoose_2.Schema({
    title: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    ingredients: [
        {
            name: { type: String, required: true },
            quantity: { type: Number, required: true },
            unit: { type: String, required: true },
        },
    ],
    vegetarian: {
        type: Boolean,
    },
    vegan: {
        type: Boolean,
    },
    nutritionPerServing: {
        calories: {
            type: Number,
            required: true,
        },
        carbohydrate: {
            type: Number,
            required: true,
        },
        protein: {
            type: Number,
            required: true,
        },
        fat: {
            type: Number,
            required: true,
        },
    },
    instructions: {
        type: String,
        required: true,
    },
    preparationTime: {
        type: Number,
        required: true,
    },
    servings: {
        type: Number,
        required: true,
    },
    userId: {
        type: mongoose_2.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
}, { timestamps: true });
exports.default = mongoose_1.default.model("Recipe", recipeSchema);
