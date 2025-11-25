import Course from "../models/Course.js";

export const addCourse = async (req, res) => {
  try {
    const course = await Course.create(req.body);
    res.json({ success: true, course });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const getCourses = async (req, res) => {
  try {
    const courses = await Course.findAll();
    res.json(courses);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateCourse = async (req, res) => {
  try {
    const [updated] = await Course.update(req.body, { where: { id: req.params.id }});
    res.json({ success: true, updatedRows: updated });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteCourse = async (req, res) => {
  try {
    const deleted = await Course.destroy({ where: { id: req.params.id }});
    res.json({ success: true, deletedRows: deleted });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
