import mongoose from 'mongoose';

const courseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  duration: String,
  instructor: String,
  status: { type: String, default: 'Active' }
}, { timestamps: true,
      collection: 'AdminCourses'
 });

const Course = mongoose.model('Course', courseSchema);

export default Course;
