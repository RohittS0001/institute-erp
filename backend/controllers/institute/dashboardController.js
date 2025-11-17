import Student from "../../models/institute/studentmanagement.js";
import Faculty from "../../models/institute/Faculty.js";
import Course from "../../models/institute/Course.js";

export const getDashboardStats = async (req, res) => {
  try {
    const totalStudents = await Student.countDocuments();
    const totalFaculty = await Faculty.countDocuments();
    const totalCourses = await Course.countDocuments();

    res.json({
      totalStudents,
      totalFaculty,
      totalCourses,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
