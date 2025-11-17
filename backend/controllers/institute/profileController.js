import Student from "../../models/institute/studentmanagement.js";
import Faculty from "../../models/institute/Faculty.js";

export const getProfile = async (req, res) => {
  try {
    const { type, id } = req.params;

    const data =
      type === "student"
        ? await Student.findById(id)
        : await Faculty.findById(id);

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { type, id } = req.params;

    const updated =
      type === "student"
        ? await Student.findByIdAndUpdate(id, req.body, { new: true })
        : await Faculty.findByIdAndUpdate(id, req.body, { new: true });

    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
