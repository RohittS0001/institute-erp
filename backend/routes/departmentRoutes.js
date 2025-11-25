// backend/routes/departmentRoutes.js
import express from "express";
import { addDepartment, getDepartments } from "../controllers/departmentController.js";

const router = express.Router();

// Add a department
router.post("/add", addDepartment);

// Get all departments
router.get("/all", getDepartments);

export default router;
