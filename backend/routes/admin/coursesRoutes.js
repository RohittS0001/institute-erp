import express from 'express';
import { 
  getAllCourses, 
  createCourse, 
  updateCourse,     // Import the update controller
  deleteCourse      // Import the delete controller
} from '../../controllers/admin/coursesController.js';

const router = express.Router();

router.get('/', getAllCourses);                // Get all courses
router.post('/', createCourse);                // Add new course
router.put('/:id', updateCourse);              // Edit course by ID
router.delete('/:id', deleteCourse);           // Delete course by ID

export default router;
