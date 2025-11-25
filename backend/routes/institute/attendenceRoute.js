import express from "express";
import {
  markAttendance,
  getAllAttendance,
} from "../controllers/attendanceController.js";

const router = express.Router();

router.post("/mark", markAttendance);
router.get("/all", getAllAttendance);

export default router;
