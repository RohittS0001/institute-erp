import Course from '../../models/admin/Course.js';

export const getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find();
    res.json(courses);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch courses' });
  }
};

export const createCourse = async (req, res) => {
  try {
    const course = new Course(req.body);
    const saved = await course.save();
    res.json(saved);
  } catch (err) {
    res.status(400).json({ error: 'Failed to add course' });
  }
};
