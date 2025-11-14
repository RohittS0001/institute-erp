// backend/controllers/admin/financialsController.js
import Financial from "../../models/admin/Financial.js";

export const getAllFinancials = async (req, res) => {
  try {
    const financials = await Financial.find();
    res.json(financials);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch financial records" });
  }
};

export const createFinancial = async (req, res) => {
  try {
    const record = new Financial(req.body);
    const saved = await record.save();
    res.json(saved);
  } catch (err) {
    res.status(400).json({ error: "Failed to add financial record" });
  }
};
