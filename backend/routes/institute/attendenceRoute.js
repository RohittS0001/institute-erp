import express from "express";
import {
  markAttendance,
  // getAttendanceByDate,
  // getStudentAttendance,
  getAllAttendance
} from "../../controllers/institute/attendenceController.js";

const router = express.Router();

router.post("/mark", markAttendance);
// router.get("/date/:date", getAttendanceByDate);
// router.get("/student/:studentId", getStudentAttendance);
router.get("/all", getAllAttendance);

export default router;   // ✅ THIS LINE WAS MISSING
