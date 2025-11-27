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

// Use Routes
app.use("/api/auth", authRoutes);
app.use("/api/user", userProfileRoute);
app.use("/api/admin", adminAuthRoutes);


app.get("/", (req, res) => {
  res.send("API is running...");
});

// Server Listening
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
