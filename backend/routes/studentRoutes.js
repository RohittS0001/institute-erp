import express from "express";
import {
  addStudent,
  getAllStudents
} from "../controllers/studentController.js";

const router = express.Router();

// GET all students
router.get("/all", getAllStudents);

// ADD new student
router.post("/add", addStudent);

export default router;
