import mongoose from "mongoose";

const OfferSchema = new mongoose.Schema(
  {
    barcode: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    brand: { type: String },
    regularPrice: { type: Number, default: 0 },
    offerPrice: { type: Number, default: 0 },
    stockStatus: {
      type: String,
      enum: ["inStock", "outOfStock", "upcoming"],
      default: "inStock",
    },
    colors: { type: [String], default: [] },
    images: { type: [String], default: [] },
    shortTitle: { type: String },
    shortDescription: { type: String },
    shortList: [{ name: String, value: String }],
    offerStartDate: { type: Date, required: true },
    offerEndDate: { type: Date, required: true },

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

// Auto barcode before validate/save
OfferSchema.pre("validate", function () {
  if (!this.barcode) {
    this.barcode = `OFF-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
  }
});

export default mongoose.models.Offer || mongoose.model("Offer", OfferSchema);
