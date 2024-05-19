import mongoose from "mongoose";
import { Schema } from "mongoose";

const shoppingListSchema = new Schema(
  {
    title: {
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
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("ShoppingList", shoppingListSchema);
