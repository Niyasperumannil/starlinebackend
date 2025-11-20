const jwt = require("jsonwebtoken");
const Admin = require("../models/adminModel");

exports.protect = async (req, res, next) => {
  try {
    const header = req.headers.authorization;

    if (!header)
      return res.status(401).json({ message: "No token provided" });

    const token = header.split(" ")[1];
    if (!token)
      return res.status(401).json({ message: "Token missing" });

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Support both id and _id
    const adminId = decoded.id || decoded._id;

    const admin = await Admin.findById(adminId);
    if (!admin)
      return res.status(401).json({ message: "Invalid admin token" });

    req.admin = admin;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};
