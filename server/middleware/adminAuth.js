import jwt from "jsonwebtoken";
import User from "../models/userModel.js"; 

const adminAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization; 
    if (!authHeader) {
      return res.json({ success: false, message: "No token provided" });
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      return res.json({ success: false, message: "No token provided" });
    }

    const decoded = jwt.verify(token, process.env.ADMIN_JWT_SECRET);

    const user = await User.findById(decoded.id);
    if (!user || user.role !== "admin") {
      return res.json({ success: false, message: "Not authorized" });
    }

    // Attach admin user to request
    req.admin = user;
    next();
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Invalid or expired token" });
  }
};

export default adminAuth;


