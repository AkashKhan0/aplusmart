import mongoose from "mongoose";

const cartItemSchema = new mongoose.Schema(
  {
    productId: { type: mongoose.Schema.Types.ObjectId, required: true },
    name: String,
    images: [String],
    quantity: { type: Number, default: 1 },
    colors: [String],
    role: { type: String, enum: ["customer", "reseller"] },

    // pricing
    offerPrice: Number,
    regularPrice: Number,
    resellerPrice: Number,
    hasOffer: Boolean,
    discountPercent: Number,
    earnedPoints: Number,
  },
  { _id: false },
);

const cartSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      unique: true,
      required: true,
    },
    items: [cartItemSchema],
  },
  { timestamps: true },
);

export default mongoose.models.Cart || mongoose.model("Cart", cartSchema);
