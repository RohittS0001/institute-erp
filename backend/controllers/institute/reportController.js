import Report from "../../models/institute/Report.js";   // FIXED PATH

// Add report
export const addReport = async (req, res) => {
  try {
    const report = await Report.create({
      title: req.body.title,
      type: req.body.type,
      description: req.body.description,
      date: req.body.date || new Date(),
    });

    return res.json({ success: true, report });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

// Get all reports
export const getReports = async (req, res) => {
  try {
    const reports = await Report.findAll({
      order: [["date", "DESC"]]
    });

    return res.json({ success: true, reports });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};
