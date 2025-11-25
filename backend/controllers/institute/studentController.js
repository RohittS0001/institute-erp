import Student from "../../models/institute/Student.js";

// ADD student
export const addStudent = async (req, res) => {
  try {
    const student = await Student.create(req.body);
    res.json({ success: true, student });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// GET ALL students
export const getStudents = async (req, res) => {
  try {
    const list = await Student.findAll();
    res.json(list);
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// UPDATE student
export const updateStudent = async (req, res) => {
  try {
    const updated = await Student.update(req.body, {
      where: { id: req.params.id }
    });
    res.json({ success: true, updatedRows: updated });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// DELETE student
export const deleteStudent = async (req, res) => {
  try {
    const deleted = await Student.destroy({
      where: { id: req.params.id }
    });
    res.json({ success: true, deletedRows: deleted });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
