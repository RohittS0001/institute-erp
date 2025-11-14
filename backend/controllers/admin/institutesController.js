// backend/controllers/admin/institutesController.js
import Institute from "../../models/admin/Institute.js";

export const getAllInstitutes = async (req, res) => {
  try {
    const institutes = await Institute.find();
    res.json(institutes);
  } catch (err) {
    res.status(500).json({ error: "Error fetching institutes" });
  }
};

export const createInstitute = async (req, res) => {
  try {
    const institute = new Institute(req.body);
    const saved = await institute.save();
    res.json(saved);
  } catch (err) {
    res.status(400).json({ error: "Failed to add institute" });
  }
};
