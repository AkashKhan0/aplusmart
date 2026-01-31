import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import User from "./models/User.js";


dotenv.config();
const app = express();
app.use(express.json());
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://localhost:3001",
      "https://aplusmartfrontend.vercel.app",
      "https://aplusmartadmin.vercel.app"
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true, 
  })
);


app.use(express.json());
app.use(cookieParser());

// MongoDB Connect
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("MongoDB Error:", err.message));

// Import Routes
import authRoutes from "./routes/auth.js";
import adminAuthRoutes from "./routes/adminAuth.js";
import faqRoutes from "./routes/faq.js";
import categoriesRoutes from "./routes/categories.js";
import uploadRoutes from "./routes/upload.js";
import productRoutes from "./routes/products.js";
import productById from "./routes/productById.js";
import userOfferRoutes from "./routes/userOffers.js";
import userRoutes from "./routes/users.js";
import userAuthRoutes from "./routes/userauth.js";
import cartRoutes from "./routes/cart.js";
import orderRoutes from "./routes/orders.js";
import contactRoutes from "./routes/contact.js";



// Use Routes
app.use("/api/auth", authRoutes);
app.use("/api/faq", faqRoutes);
app.use("/api/categories", categoriesRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/products", productRoutes);
app.use("/api/products", productById);
app.use("/api/user-offers", userOfferRoutes);
app.use("/api/admin", adminAuthRoutes);
app.use("/api/users", userRoutes);
app.use("/api/userauth", userAuthRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/contact", contactRoutes);



app.get("/", (req, res) => {
  res.send("API is running...");
});

// 🔄 Cleanup expired points every day
setInterval(async () => {
  const now = new Date();
  const users = await User.find();

  for (let user of users) {
    const beforeCount = user.pointsHistory.length;
    user.pointsHistory = user.pointsHistory.filter(
      p => (now - new Date(p.createdAt)) / (1000*60*60*24) <= 30
    );
    if (user.pointsHistory.length !== beforeCount) {
      await user.save();
    }
  }
  console.log("Expired points cleanup done");
}, 24 * 60 * 60 * 1000);

// Server Listening
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
