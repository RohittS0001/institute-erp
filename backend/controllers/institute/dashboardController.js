import { sequelize } from "../../config/db.js";
import Department from "../../models/institute/Department.js";
import Faculty from "../../models/institute/Faculty.js";
import Course from "../../models/institute/Course.js";
import Student from "../../models/institute/Student.js";

export const getDashboardStats = async (req, res) => {
  try {
    const departments = await Department.count();
    const faculty = await Faculty.count();
    const courses = await Course.count();
    const students = await Student.count();

    res.json({
      departments,
      faculty,
      courses,
      students
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
