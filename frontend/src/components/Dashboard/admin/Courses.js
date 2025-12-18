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
  const [editId, setEditId] = useState(null);
  const [editCourse, setEditCourse] = useState({
    title: "",
    duration: "",
    instructor: "",
    status: "",
  });

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get("https://backenderp-production-6374.up.railway.app/api/admin/courses");
        setCourses(response.data);
      } catch (error) {
        console.error("Error fetching courses:", error);
        setCourses([]);
      }
    };
    fetchCourses();
  }, []);

  // Filter courses based on search input
  const filteredCourses = courses.filter(
    (course) =>
      course.title?.toLowerCase().includes(search.toLowerCase()) ||
      course.instructor?.toLowerCase().includes(search.toLowerCase()) ||
      course.status?.toLowerCase().includes(search.toLowerCase())
  );

  // Handle input change for new course form
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewCourse((prev) => ({ ...prev, [name]: value }));
  };

  // Handle input change for edit course form
  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditCourse((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission to add new course
  const handleAddCourse = async (e) => {
    e.preventDefault();
    if (!newCourse.title.trim()) {
      alert("Course title is required");
      return;
    }
    try {
      const response = await axios.post(
        "https://backenderp-production-6374.up.railway.app/api/admin/courses",
        newCourse
      );
      setCourses((prev) => [...prev, response.data]);
      setNewCourse({ title: "", duration: "", instructor: "", status: "Active" });
      setShowAddForm(false);
    } catch (error) {
      console.error("Failed to add course:", error);
      alert("Failed to add course. Please try again.");
    }
  };

  // Handle course deletion
  const handleDeleteCourse = async (id) => {
    if (!window.confirm("Are you sure you want to delete this course?")) return;
    try {
      await axios.delete(`https://backenderp-production-6374.up.railway.app/api/admin/courses/${id}`);
      setCourses((prev) => prev.filter((course) => course.id !== id));
    } catch (error) {
      console.error("Failed to delete course:", error);
      alert("Failed to delete course. Please try again.");
    }
  };

  // Enter edit mode for a course
  const handleEdit = (course) => {
    setEditId(course.id);
    setEditCourse({
      title: course.title,
      duration: course.duration,
      instructor: course.instructor,
      status: course.status,
    });
  };

  // Save edited course
  const handleEditSave = async (id) => {
    try {
      const response = await axios.put(
        `https://backenderp-production-6374.up.railway.app/api/admin/courses/${id}`,
        editCourse
      );
      setCourses((prev) =>
        prev.map((course) =>
          course.id === id ? response.data : course
        )
      );
      setEditId(null);
    } catch (error) {
      console.error("Failed to edit course:", error);
      alert("Failed to update course. Please try again.");
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
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredCourses.length ? (
            filteredCourses.map((course) =>
              editId === course.id ? (
                <tr key={course.id}>
                  <td>
                    <input
                      name="title"
                      value={editCourse.title}
                      onChange={handleEditChange}
                      required
                    />
                  </td>
                  <td>
                    <input
                      name="duration"
                      value={editCourse.duration}
                      onChange={handleEditChange}
                    />
                  </td>
                  <td>
                    <input
                      name="instructor"
                      value={editCourse.instructor}
                      onChange={handleEditChange}
                    />
                  </td>
                  <td>
                    <select
                      name="status"
                      value={editCourse.status}
                      onChange={handleEditChange}
                    >
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                    </select>
                  </td>
                  <td>
                    <button
                      className="submit-btn"
                      onClick={() => handleEditSave(course.id)}
                    >
                      Save
                    </button>
                    <button
                      className="cancel-btn"
                      onClick={() => setEditId(null)}
                    >
                      Cancel
                    </button>
                  </td>
                </tr>
              ) : (
                <tr key={course.id} className={course.status.toLowerCase()}>
                  <td>{course.title}</td>
                  <td>{course.duration}</td>
                  <td>{course.instructor}</td>
                  <td>{course.status}</td>
                  <td>
                    <button
                      className="edit-B"
                      onClick={() => handleEdit(course)}
                    >
                      Edit
                    </button>
                    <button
                      className="delete-B"
                      onClick={() => handleDeleteCourse(course.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              )
            )
          ) : (
            <tr>
              <td colSpan="5" style={{ textAlign: "center", padding: "20px" }}>
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
