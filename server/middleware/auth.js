import jwt from "jsonwebtoken";
import User from "../models/User.js";

const protect = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ success: false, message: "Not authorized, no token" });
  }

  const token = authHeader.split(" ")[1];

  try {
    // Verify the token and extract user ID from payload
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;

    if (!userId) {
      return res.status(401).json({ success: false, message: "Not authorized, invalid token" });
    }

    // Fetch user data (excluding password) and attach to request
    req.user = await User.findById(userId).select("-password");
    if (!req.user) {
      return res.status(401).json({ success: false, message: "User not found" });
    }

    next();
  } catch (error) {
    console.error(error.message);
    return res.status(401).json({ success: false, message: "Token verification failed" });
  }
};

export default protect;
