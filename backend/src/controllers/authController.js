import bcrypt from "bcryptjs";
import User from "../models/User.js";

// ------------------ SIGNUP ------------------
export const signup = async (req, res) => {
  try {
    const { role, fullName, email, phone, password, shopName, location, resellerName } = req.body;

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

