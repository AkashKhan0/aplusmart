import mongoose from "mongoose";

const ComboSchema = new mongoose.Schema(
  {
    name: String,
    brand: String,

    regularPrice: Number,
    offerPrice: Number,

    images: [String],

    stockStatus: {
      type: String,
      enum: ["inStock", "outOfStock", "upcoming"],
      default: "inStock",
    },

    colors: [String],

    shortTitle: String,
    shortDescription: String,

    shortList: [{ name: String, value: String }],

    specifications: [
      {
        title: String,
        description: String,
        list: [{ name: String, value: String }],
      },
    ],

    offerStartDate: { type: Date, required: true },
    offerEndDate: { type: Date, required: true },
  },
  { timestamps: true }
);

export default mongoose.models.Combo ||
  mongoose.model("Combo", ComboSchema);
