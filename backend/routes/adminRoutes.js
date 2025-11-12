import express from "express";
import { registerAdmin, getAdmins, loginAdmin } from "../controllers/adminController.js";

const router = express.Router();

router.post("/register", registerAdmin);   // For registering new admin
router.get("/", getAdmins);                // For getting all admins
router.post("/login", loginAdmin);         // For admin login (authentication)

export default router;
