import Course from "../../models/institute/Course.js";

export const addCourse = async (req, res) => {
  // console.log("course is adding")
  try {
    const saved = await Course.create(req.body);
    res.json(saved);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getCourses = async (req, res) => {
  try {
    const list = await Course.find();
    res.json(list);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateCourse = async (req, res) => {
  try {
    const updated = await Course.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteCourse = async (req, res) => {
  try {
    await Course.findByIdAndDelete(req.params.id);
    res.json({ message: "Course Deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
