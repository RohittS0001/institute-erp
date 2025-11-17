import express from "express";
const router = express.Router();

import {
  getAttendanceReport,
  getCourseReport
} from "../../controllers/institute/reportsController.js"; // Add .js for ESM

router.get("/attendance", getAttendanceReport);
router.get("/course-report", getCourseReport);
// router.get("/students", studentReport);
// router.get("/faculty", facultyReport);

export default router;
