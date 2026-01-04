import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    role: {
      type: String,
      enum: ["customer", "reseller"],
      required: true,
    },

    // COMMON FIELDS
    email: { type: String, required: true, unique: true, sparse: true, },
    phone: { type: String, required: true, unique: true, sparse: true, },
    password: { type: String, required: true },

    // CUSTOMER FIELDS
    fullName: { type: String },

    // RESELLER FIELDS
    shopName: { type: String },
    location: { type: String },
    resellerName: { type: String },
  },
  { timestamps: true }
);


export default mongoose.models.User || mongoose.model("User", userSchema);
