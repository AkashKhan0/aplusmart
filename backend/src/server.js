import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";


dotenv.config();
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// MongoDB Connect
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("MongoDB Error:", err.message));

// Import Routes
import authRoutes from "./routes/auth.js";
import userProfileRoute from "./routes/user.js";
import adminAuthRoutes from "./routes/adminAuth.js";
import faqRoutes from "./routes/faq.js";
import categoriesRoutes from "./routes/categories.js";
import uploadRoutes from "./routes/upload.js";
import productRoutes from "./routes/products.js";
import productById from "./routes/productById.js";
import offersRoutes from "./routes/offers.js";
import comboRoutes from "./routes/combos.js";


// Use Routes
app.use("/api/auth", authRoutes);
app.use("/api/user", userProfileRoute);
app.use("/api/admin", adminAuthRoutes);
app.use("/api/faq", faqRoutes);
app.use("/api/categories", categoriesRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/products", productRoutes);
app.use("/api/products", productById);
app.use("/api/offers", offersRoutes);
app.use("/api/combos", comboRoutes);



app.get("/", (req, res) => {
  res.send("API is running...");
});

// Server Listening
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
