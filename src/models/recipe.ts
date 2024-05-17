import mongoose from "mongoose";
import { Schema } from "mongoose";

const recipeSchema = new Schema(
  {
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
    nutrition: {
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
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Recipe", recipeSchema);
