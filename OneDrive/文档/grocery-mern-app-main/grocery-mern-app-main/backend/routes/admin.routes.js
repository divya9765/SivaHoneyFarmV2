import express from "express";
import { checkAuth, loginAdmin, logout, registerAdmin } from "../controller/admin.controller.js";
import authAdmin from "../middlewares/authAdmin.js";
const router = express.Router();
router.post("/register", registerAdmin);
router.post("/login", loginAdmin);
router.get("/is-auth", authAdmin, checkAuth);
router.get("/logout", authAdmin, logout);
export default router;
