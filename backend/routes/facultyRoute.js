// backend/routes/institute/facultyRoute.js
import express from "express";
import {
  addFaculty,
  getAllFaculty
} from "../../controllers/institute/facultyController.js";

const router = express.Router();

// Add new faculty
router.post("/add", addFaculty);

// Get all faculty
router.get("/all", getAllFaculty);

export default router;
