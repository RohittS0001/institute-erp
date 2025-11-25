import express from "express";
import {
  addDepartment,
  getDepartments
} from "../../controllers/institute/departmentController.js";

const router = express.Router();

// Add new department
router.post("/add", addDepartment);

// Get all departments
router.get("/all", getDepartments);

export default router;
