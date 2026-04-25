import express from "express";
import jwt from "jsonwebtoken";
import authUser from "../middlewares/authUser.js";
import {
  getAllOrders,
  getUserOrders,
  placeOrderCOD,
  updateOrderStatus,
  placeOrderOnline,
} from "../controller/order.controller.js";
import { authSeller } from "../middlewares/authSeller.js";

const router = express.Router();

// Combined middleware that allows either Seller or Admin to manage orders
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

router.post("/cod", authUser, placeOrderCOD);
router.post("/online", authUser, placeOrderOnline);
router.get("/user", authUser, getUserOrders);
router.get("/seller", authManager, getAllOrders);
router.put("/status/:id", authManager, updateOrderStatus);

export default router;
