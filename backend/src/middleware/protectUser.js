import jwt from "jsonwebtoken";

export const protectUser = (req, res, next) => {
  const token = req.cookies.userToken;
  if (!token) return res.status(401).json({ error: "Unauthorized" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch {
    res.status(401).json({ error: "Invalid token" });
  }
};
