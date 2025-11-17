import Attendence from "../../models/institute/Attendence.js";

export const markAttendance = async (req, res) => {
  try {
    // Accept studentName and role (your UI is sending this)
    const attendance = await Attendance.create({
      studentName: req.body.studentName,
      role: req.body.role || "Student",
      date: req.body.date,
      status: req.body.status
    });

    res.json(attendance);
  } catch (error) {
    console.log("Attendance Save Error:", error);
    res.status(500).json({ message: error.message });
  }
};

export const getAllAttendance = async (req, res) => {
  try {
    const all = await Attendance.find();
    res.json(all);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
