import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Courses.css";

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [search, setSearch] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);
  const [newCourse, setNewCourse] = useState({
    title: "",
    duration: "",
    instructor: "",
    status: "Active",
  });

  useEffect(() => {
    // Fetch courses from backend API on component mount
    const fetchCourses = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/courses");
        setCourses(response.data);
      } catch (error) {
        console.error("Error fetching courses:", error);
        setCourses([]);
      }
    };
    fetchCourses();
  }, []);

  // Filter courses based on search input
  const filteredSessions = courses.filter(
    (course) =>
      course.title.toLowerCase().includes(search.toLowerCase()) ||
      course.instructor.toLowerCase().includes(search.toLowerCase()) ||
      course.status.toLowerCase().includes(search.toLowerCase())
  );

  // Handle input change for new course form
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewCourse((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission to add new course
  const handleAddCourse = async (e) => {
    e.preventDefault();
    if (!newCourse.title.trim()) {
      alert("Course title is required");
      return;
    }
    // Send data to backend API to save in database
    try {
      const response = await axios.post("http://localhost:4000/api/courses", newCourse);
      // Add the newly created course to local list
      setCourses((prev) => [...prev, response.data]);
      // Reset form
      setNewCourse({ title: "", duration: "", instructor: "", status: "Active" });
      setShowAddForm(false);
    } catch (error) {
      console.error("Failed to add course:", error);
      alert("Failed to add course. Please try again.");
    }
  };

  const toggleForm = () => setShowAddForm((prev) => !prev);

  return (
    <div className="page-content">
      <h1>Course Management</h1>
      <div className="header-top">
        <input
          type="search"
          className="courses-search"
          placeholder="Search courses..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button onClick={toggleForm} className="add-btn">
          {showAddForm ? "Close Form" : "Add New Course"}
        </button>
      </div>

      {showAddForm && (
        <form onSubmit={handleAddCourse} className="add-form">
          <input
            name="title"
            placeholder="Course Title"
            value={newCourse.title}
            onChange={handleChange}
            required
          />
          <input
            name="duration"
            placeholder="Duration (e.g., 6 weeks)"
            value={newCourse.duration}
            onChange={handleChange}
          />
          <input
            name="instructor"
            placeholder="Instructor Name"
            value={newCourse.instructor}
            onChange={handleChange}
          />
          <select name="status" value={newCourse.status} onChange={handleChange}>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
          <button type="submit" className="submit-btn">
            Save Course
          </button>
        </form>
      )}

      <table className="courses-table">
        <thead>
          <tr>
            <th>Course Title</th>
            <th>Duration</th>
            <th>Instructor</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {filteredSessions.length ? (
            filteredSessions.map((course) => (
              <tr key={course.id || course._id} className={course.status.toLowerCase()}>
                <td>{course.title}</td>
                <td>{course.duration}</td>
                <td>{course.instructor}</td>
                <td>{course.status}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" style={{ textAlign: "center", padding: "20px" }}>
                No courses found matching your search.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Courses;
