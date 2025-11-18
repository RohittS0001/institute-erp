import Institute from "../../models/admin/Institute.js";

// Get all institutes
export const getAllInstitutes = async (req, res) => {
  try {
    const institutes = await Institute.find();
    res.json(institutes);
  } catch (err) {
    res.status(500).json({ error: "Error fetching institutes" });
  }
};

// Create a new institute
export const createInstitute = async (req, res) => {
  try {
    const institute = new Institute(req.body);
    const saved = await institute.save();
    res.json(saved);
  } catch (err) {
    res.status(400).json({ error: "Failed to add institute" });
  }
};

// Update an institute by ID
export const updateInstitute = async (req, res) => {
  try {
    const updated = await Institute.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updated) {
      return res.status(404).json({ error: "Institute not found" });
    }
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: "Failed to update institute" });
  }
};

// Delete an institute by ID
export const deleteInstitute = async (req, res) => {
  try {
    const deleted = await Institute.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: "Institute not found" });
    }
    res.json({ message: "Institute deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete institute" });
  }
};
