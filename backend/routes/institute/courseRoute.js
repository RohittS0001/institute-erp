import express from "express";
const router = express.Router();

import {
  addCourse,
  getCourses,
  updateCourse,
  deleteCourse
} from "../../controllers/institute/courseController.js";

router.post("/add", addCourse);
router.get("/all", getCourses);
router.put("/update/:id", updateCourse);
router.delete("/delete/:id", deleteCourse);

export default router;
