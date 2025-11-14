// backend/controllers/admin/reportsController.js
import Report from "../../models/admin/Report.js";

export const getAllReports = async (req, res) => {
  try {
    const reports = await Report.find();
    res.json(reports);
  } catch (err) {
    res.status(500).json({ error: "Error fetching reports" });
  }
};

export const createReport = async (req, res) => {
  try {
    const report = new Report(req.body);
    const saved = await report.save();
    res.json(saved);
  } catch (err) {
    res.status(400).json({ error: "Failed to add report" });
  }
};
