import jwt from "jsonwebtoken";
import User from "../models/User.js";

const adminAuth = async (req, res, next) => {
  try {
    const token = req.cookies.adminToken;
    if (!token) {
      return res.status(401).json({ error: "Admin token missing" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const admin = await User.findById(decoded.id).select("-password");
    if (!admin || admin.role !== "admin") {
      return res.status(403).json({ error: "Admin access only" });
    }
    req.admin = admin; // admin info store
    next();
  } catch (err) {
    return res.status(401).json({ error: "Invalid admin token" });
  }
};
export default adminAuth;
