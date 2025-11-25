import Attendance from "../models/Attendance.js";

export const markAttendance = async (req, res) => {
  try {
    const attendance = await Attendance.create({
      studentName: req.body.studentName,
      role: req.body.role || "Student",
      date: req.body.date,
      status: req.body.status,
      studentId: req.body.studentId || null,
    });
    res.json(attendance);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllAttendance = async (req, res) => {
  try {
    const all = await Attendance.findAll();
    res.json(all);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
