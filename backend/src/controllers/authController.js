import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

// ------------------ SIGNUP ------------------
export const signup = async (req, res) => {
  try {
    const { role, fullName, emailOrPhone, password, shopName, location, resellerName } = req.body;

    // Existing user check
    const existingUser = await User.findOne({ emailOrPhone });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user object
    const newUserData =
      role === "customer"
        ? { role, fullName, emailOrPhone, password: hashedPassword }
        : { role, shopName, location, resellerName, emailOrPhone, password: hashedPassword };

    const newUser = new User(newUserData);
    await newUser.save();

    res.status(201).json({ message: "Registration successful" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ------------------ LOGIN ------------------
export const login = async (req, res) => {
  try {
    const { emailOrPhone, password } = req.body;

    // Check user exist
    const user = await User.findOne({ emailOrPhone });
    if (!user) return res.status(400).json({ error: "User not found" });

    // Password check
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: "Incorrect password" });

    // JWT token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(200).json({
      message: "Login successful",
      token,
      user,
    });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};
