import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    role: {
      type: String,
      enum: ["customer", "reseller"],
      required: true,
    },
    email: { type: String, required: true, unique: true, sparse: true },
    phone: { type: String, required: true, unique: true, sparse: true },
    password: { type: String, required: true },
    fullName: { type: String },
    shopName: { type: String },
    location: { type: String },
    resellerName: { type: String },
    pointsHistory: [
      {
        points: { type: Number, required: true },
        createdAt: { type: Date, default: Date.now },
      },
    ],
    resetToken: {
      type: String,
    },
    resetTokenExpiry: {
      type: Date,
    },
  },
  { timestamps: true },
);

export default mongoose.models.User || mongoose.model("User", userSchema);
