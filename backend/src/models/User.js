import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    role: {
      type: String,
      enum: ["customer", "reseller"],
      required: true,
    },

    // COMMON FIELDS
    emailOrPhone: {
      type: String,
      required: true,
      unique: true,
    },
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
