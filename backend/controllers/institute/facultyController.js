import Faculty from "../../models/institute/Faculty.js";

export const addFaculty = async (req, res) => {
  try {
    const saved = await Faculty.create(req.body);
    res.json(saved);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getFaculty = async (req, res) => {
  try {
    const list = await Faculty.find();
    res.json(list);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateFaculty = async (req, res) => {
  try {
    const updated = await Faculty.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteFaculty = async (req, res) => {
  try {
    await Faculty.findByIdAndDelete(req.params.id);
    res.json({ message: "Faculty Deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
