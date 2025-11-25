import Report from "../models/Report.js";

export const addReport = async (req, res) => {
  try {
    const report = await Report.create(req.body);
    res.json({ success: true, report });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getReports = async (req, res) => {
  try {
    const reports = await Report.findAll();
    res.json(reports);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
