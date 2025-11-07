import React, { useState } from "react";
import "./Courses.css";

const initialCourses = [
  {
    id: 1,
    title: "React Fundamentals",
    duration: "8 weeks",
    instructor: "Mary Johnson",
    status: "Active",
  },
  {
    id: 2,
    title: "Advanced Node.js",
    duration: "6 weeks",
    instructor: "James Smith",
    status: "Inactive",
  },
  {
    id: 3,
    title: "Python for Data Science",
    duration: "10 weeks",
    instructor: "Linda Williams",
    status: "Active",
  },
];

const Courses = () => {
  const [courses, setCourses] = useState(initialCourses);
  const [search, setSearch] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);
  const [newCourse, setNewCourse] = useState({
    title: "",
    duration: "",
    instructor: "",
    status: "Active",
  });

  const filteredSessions = courses.filter(
    (course) =>
      course.title.toLowerCase().includes(search.toLowerCase()) ||
      course.instructor.toLowerCase().includes(search.toLowerCase()) ||
      course.status.toLowerCase().includes(search.toLowerCase())
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewCourse((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddCourse = (e) => {
    e.preventDefault();
    if (!newCourse.title.trim()) {
      alert("Course title is required");
      return;
    }
    setCourses((prev) => [...prev, { ...newCourse, id: prev.length + 1 }]);
    setNewCourse({ title: "", duration: "", instructor: "", status: "Active" });
    setShowAddForm(false);
  };

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
        <button onClick={() => setShowAddForm((prev) => !prev)} className="add-btn">
          {showAddForm ? "Close Form" : "Add New Course"}
        </button>
      </div>

      {showAddForm && (
        <form onSubmit={handleAddCourse} className="add-form">
          <input
            type="text"
            name="title"
            placeholder="Course Title"
            value={newCourse.title}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="duration"
            placeholder="Duration (e.g., 6 weeks)"
            value={newCourse.duration}
            onChange={handleChange}
          />
          <input
            type="text"
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
              <tr key={course.id} className={course.status.toLowerCase()}>
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
