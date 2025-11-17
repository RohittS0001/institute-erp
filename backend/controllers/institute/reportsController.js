import Attendance from "../../models/institute/Attendence.js";
import Course from "../../models/institute/Course.js";

export const getAttendanceReport = async (req, res) => {
  try {
    const report = await Attendance.find({ courseId: req.params.courseId });
    res.json(report);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getCourseReport = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    res.json(course);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
