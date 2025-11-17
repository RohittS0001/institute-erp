import express from "express";
import { registerAdmin, getAdmins, loginAdmin } from "../controllers/adminController.js";

const router = express.Router();
router.post("/register", registerAdmin);
router.get("/", getAdmins);
router.post("/login", loginAdmin);

export default router;
