import express from "express";
import jwt from "jsonwebtoken";
import { authSeller } from "../middlewares/authSeller.js";
import {
  addProduct,
  changeStock,
  getProductById,
  getProducts,
  updateProduct,
  deleteProduct,
} from "../controller/product.controller.js";
import { upload } from "../config/multer.js";
const router = express.Router();

// Combined middleware that allows either Seller or Admin
const authManager = async (req, res, next) => {
  try {
    const { sellerToken, adminToken } = req.cookies;
    if (sellerToken) {
      try {
        const decoded = jwt.verify(sellerToken, process.env.JWT_SECRET);
        if (decoded.email === process.env.SELLER_EMAIL) return next();
      } catch (_) {}
    }
    if (adminToken) {
      try {
        jwt.verify(adminToken, process.env.JWT_SECRET);
        return next();
      } catch (_) {}
    }
    return res.status(401).json({ message: "Unauthorized", success: false });
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized", success: false });
  }
};

router.post("/add-product", authManager, upload.array("image", 4), addProduct);
router.get("/list", getProducts);
router.get("/id", getProductById);
router.post("/stock", authManager, changeStock);
router.put("/update", authManager, upload.array("image", 4), updateProduct);
router.delete("/delete", authManager, deleteProduct);

export default router;
