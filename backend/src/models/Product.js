import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    barcode: { type: String, required: true, unique: true }, // unique barcode
    name: { type: String, required: true },
    mainCategory: { type: String, required: true },
    subCategory: { type: String, required: true },
    brand: { type: String },
    regularPrice: {
      type: Number,
      default: 0,
    },
    offerPrice: {
      type: Number,
      default: 0,
    },
    stockStatus: {
      type: String,
      enum: ["inStock", "outOfStock", "upcoming"],
      default: "inStock",
    },
    colors: {
      type: [String],
      default: [],
    },

    images: [{ type: String }],
    shortTitle: { type: String },
    shortDescription: { type: String },
    shortList: [{ name: String, value: String }],
    specifications: [
      {
        title: String,
        description: String,
        list: [{ name: String, value: String }],
      },
    ],
  },
  { timestamps: true }
);

// generate a unique barcode before save if not exists
ProductSchema.pre("validate", function () {
  if (!this.barcode) {
    this.barcode = `PRD-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
  }
});

export default mongoose.models.Product ||
  mongoose.model("Product", ProductSchema);
