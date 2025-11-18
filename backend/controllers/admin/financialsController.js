import Financial from "../../models/admin/Financial.js";

// Get all financial records
export const getAllFinancials = async (req, res) => {
  try {
    const financials = await Financial.find();
    res.json(financials);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch financial records" });
  }
};

// Add a new financial record
export const createFinancial = async (req, res) => {
  try {
    const record = new Financial(req.body);
    const saved = await record.save();
    res.json(saved);
  } catch (err) {
    res.status(400).json({ error: "Failed to add financial record" });
  }
};

// Update a financial record by ID
export const updateFinancial = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await Financial.findByIdAndUpdate(id, req.body, { new: true });
    if (!updated) return res.status(404).json({ error: "Financial record not found" });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: "Failed to update financial record" });
  }
};

// Delete a financial record by ID
export const deleteFinancial = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Financial.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ error: "Financial record not found" });
    res.json({ message: "Financial record deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete financial record" });
  }
};
