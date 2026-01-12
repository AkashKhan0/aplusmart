import bcrypt from "bcryptjs";
import User from "../models/User.js";
import jwt from "jsonwebtoken";
import crypto from "crypto";

// ------------------ SIGNUP ------------------
export const signup = async (req, res) => {
  try {
    const { role, fullName, shopName, location, resellerName, email, phone, password } = req.body;

    // Existing user check
    const existingUser = await User.findOne({ $or: [{ email }, { phone }] });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user object
    const newUserData =
      role === "customer"
        ? { role, fullName, email, phone, password: hashedPassword }
        : { role, shopName, location, resellerName, email, phone, password: hashedPassword };

    const newUser = new User(newUserData);
    await newUser.save();
    res.status(201).json({ message: "Registration successful", newUser });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ================= LOGIN =================
export const loginUser = async (req, res) => {
  const { email, password, rememberMe } = req.body;

  const user = await User.findOne({ email });
  if (!user){console.log("User not found"); return res.status(401).json({ error: "Invalid credentials" })};

  const isMatch = await bcrypt.compare(password, user.password);
  console.log("Password match:", isMatch);
  if (!isMatch) return res.status(401).json({ error: "Invalid credentials" });

  const token = jwt.sign(
    { id: user._id },
    process.env.JWT_SECRET,
    { expiresIn: rememberMe ? "30d" : "1d" }
  );

  res.cookie("userToken", token, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    maxAge: rememberMe
      ? 30 * 24 * 60 * 60 * 1000
      : 24 * 60 * 60 * 1000,
  });

  res.json({
    message: "Login successful",
    user: {
      id: user._id,
      email: user.email,
      fullName: user.fullName || user.shopName || user.resellerName,
    },
  });
};

// ================= PROFILE =================
// export const getProfile = async (req, res) => {
//   const user = await User.findById(req.user.id).select("-password");
//   res.json(user);
// };

export const getProfile = async (req, res) => {
  try {
    // protectUser already verified token
    const user = await User.findById(req.user._id).select(
      "-password"
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

     // 🔑 Calculate valid points (last 30 days)
     let totalPoints = 0;
     
     if (user.pointsHistory) {
      const now = new Date();
      user.pointsHistory.forEach(p => {
        const diffDays = (now - new Date(p.createdAt)) / (1000 * 60 * 60 * 24);
        if (diffDays <= 90) {
          totalPoints += p.points;
        }
      });
    }

    // ✅ send points from DB
    res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      role: user.role,
       points: totalPoints,
    });
  } catch (error) {
    res.status(500).json({ message: "Profile fetch failed" });
  }
};


// ================= LOGOUT =================
export const logoutUser = async (req, res) => {
  // clear auth cookie
  res.clearCookie("userToken", {
    path: "/",
  });

  // 🔥 clear cart cookie
  res.clearCookie("cart", {
    path: "/",
  });

  res.json({ message: "Logged out" });
};

// ================= FORGOT PASSWORD =================
export const forgotPassword = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.json({ message: "If email exists, link sent" });

  const token = crypto.randomBytes(32).toString("hex");
  user.resetToken = token;
  user.resetTokenExpiry = Date.now() + 15 * 60 * 1000;
  await user.save();

  // 👉 এখানে email পাঠাবে (console for now)
  console.log(
    `Reset Link: ${process.env.FRONTEND_URL}/reset-password/${token}`
  );

  res.json({ message: "Reset link sent" });
};

// ================= RESET PASSWORD =================
export const resetPassword = async (req, res) => {
  const { token, password } = req.body;

  const user = await User.findOne({
    resetToken: token,
    resetTokenExpiry: { $gt: Date.now() },
  });

  if (!user) return res.status(400).json({ error: "Invalid or expired token" });

  user.password = await bcrypt.hash(password, 10);
  user.resetToken = null;
  user.resetTokenExpiry = null;
  await user.save();

  res.json({ message: "Password updated" });
};