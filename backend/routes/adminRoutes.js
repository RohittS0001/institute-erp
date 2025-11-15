import express from "express";
import { registerAdmin, getAdmins, loginAdmin } from "../controllers/adminController.js";

const router = express.Router();

// POST /api/admin/register
router.post("/register", registerAdmin);

// GET /api/admin/
router.get("/", getAdmins);

// POST /api/admin/login
router.post("/login", loginAdmin);

export default router;
