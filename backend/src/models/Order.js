import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    orderId: { type: String, required: true, unique: true },
    billing: {
      fullName: String,
      address: String,
      city: String,
      thana: String,
      district: String,
      phone: String,
      email: String,
      comment: String,
    },
    items: [
      {
        productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
        name: String,
        quantity: Number,
        price: Number,
        colors: [String],
        image: String,
      },
    ],
    shippingMethod: String,
    shippingCharge: Number,
    paymentMethod: String,
    points: {
      type: Number,
      default: 0,
    },
    grandTotal: Number,
    status: {
      type: String,
      enum: ["pending", "processing", "shipped", "delivered", "cancelled"],
      default: "pending",
    },
    paymentStatus: {
      type: String,
      enum: ["not yet", "delivery_fee", "paid"],
      default: "not yet",
    },
  },
  { timestamps: true }
);

export default mongoose.models.Order || mongoose.model("Order", orderSchema);
