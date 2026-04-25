import jwt from "jsonwebtoken";
const authAdmin = async (req, res, next) => {
  const { adminToken } = req.cookies;
  if (!adminToken) {
    return res.status(401).json({ message: "Unauthorized", success: false });
  }
  try {
    const decoded = jwt.verify(adminToken, process.env.JWT_SECRET);
    req.admin = decoded.id;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token", success: false });
  }
};
export default authAdmin;
