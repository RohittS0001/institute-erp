import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Courses.css";

export default function Courses() {
  const [search, setSearch] = useState("");
  const [courses, setCourses] = useState([]);
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState({ name: "", code: "", instructor: "", seats: "" });
  const navigate = useNavigate();

  // GET all courses
  const fetchCourses = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/institute/course/all");
      setCourses(res.data);
    } catch (err) {
      console.log("Error fetching courses", err);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  // ADD course
  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/institute/course/add", form);
      setForm({ name: "", code: "", instructor: "", seats: "" });
      setShowAdd(false);
      fetchCourses();
    } catch (err) {
      console.log("Error adding course");
    }
  };

  const filteredCourses = courses.filter(
    (course) =>
      course.name.toLowerCase().includes(search.toLowerCase()) ||
      course.code.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="courses-page">
      <div className="courses-header">
        <h2>Courses Management</h2>
        <div className="courses-actions">
          <button className="courses-btn" onClick={() => navigate("/")}>
            ← Dashboard
          </button>
          <button className="courses-btn" onClick={() => setShowAdd((prev) => !prev)}>
            + Add Course
          </button>
        </div>
      </div>

      {showAdd && (
        <form className="add-course-form" onSubmit={handleAdd}>
          <input
            type="text"
            placeholder="Course Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Course Code"
            value={form.code}
            onChange={(e) => setForm({ ...form, code: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Instructor"
            value={form.instructor}
            onChange={(e) => setForm({ ...form, instructor: e.target.value })}
            required
          />
          <input
            type="number"
            placeholder="Seats"
            value={form.seats}
            onChange={(e) => setForm({ ...form, seats: e.target.value })}
            required
            min={1}
          />

          <button type="submit" className="courses-btn">Add</button>
        </form>
      )}

      <div className="courses-topbar">
        <input
          className="courses-search"
          type="search"
          placeholder="Search course name/code..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <table className="courses-table">
        <thead>
          <tr>
            <th>Course Name</th>
            <th>Code</th>
            <th>Instructor</th>
            <th>Seats</th>
          </tr>
        </thead>
        <tbody>
          {filteredCourses.map((course) => (
            <tr key={course._id}>
              <td>{course.name}</td>
              <td>{course.code}</td>
              <td>{course.instructor}</td>
              <td>{course.seats}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}


// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import "./Courses.css";

// const dummyCourses = [
//   { id: 1, name: "Python Programming", code: "CS101", instructor: "Dr. Mehta", seats: 45 },
//   { id: 2, name: "Data Structures", code: "CS102", instructor: "Ms. Sharma", seats: 50 },
//   { id: 3, name: "AI Fundamentals", code: "AIML201", instructor: "Dr. Patel", seats: 38 },
// ];

// export default function Courses() {
//   const [search, setSearch] = useState("");
//   const [courses, setCourses] = useState(dummyCourses);
//   const [showAdd, setShowAdd] = useState(false);
//   const [form, setForm] = useState({ name: "", code: "", instructor: "", seats: "" });
//   const navigate = useNavigate();

//   const filteredCourses = courses.filter(
//     (course) =>
//       course.name.toLowerCase().includes(search.toLowerCase()) ||
//       course.code.toLowerCase().includes(search.toLowerCase())
//   );

//   // Handle add course
//   const handleAdd = (e) => {
//     e.preventDefault();
//     if (form.name && form.code && form.instructor && form.seats) {
//       setCourses([
//         ...courses,
//         {
//           id: courses.length + 1,
//           name: form.name,
//           code: form.code,
//           instructor: form.instructor,
//           seats: parseInt(form.seats),
//         },
//       ]);
//       setForm({ name: "", code: "", instructor: "", seats: "" });
//       setShowAdd(false);
//     }
//   };

//   return (
//     <div className="courses-page">
//       <div className="courses-header">
//         <h2>Courses Management</h2>
//         <div className="courses-actions">
//           <button className="courses-btn" onClick={() => navigate("/")}>
//             ← Dashboard
//           </button>
//           <button className="courses-btn" onClick={() => setShowAdd((prev) => !prev)}>
//             + Add Course
//           </button>
//         </div>
//       </div>

//       {showAdd && (
//         <form className="add-course-form" onSubmit={handleAdd}>
//           <input
//             type="text"
//             placeholder="Course Name"
//             value={form.name}
//             onChange={(e) => setForm({ ...form, name: e.target.value })}
//             required
//           />
//           <input
//             type="text"
//             placeholder="Course Code"
//             value={form.code}
//             onChange={(e) => setForm({ ...form, code: e.target.value })}
//             required
//           />
//           <input
//             type="text"
//             placeholder="Instructor"
//             value={form.instructor}
//             onChange={(e) => setForm({ ...form, instructor: e.target.value })}
//             required
//           />
//           <input
//             type="number"
//             placeholder="Seats"
//             value={form.seats}
//             onChange={(e) => setForm({ ...form, seats: e.target.value })}
//             required
//             min={1}
//           />
//           <button type="submit" className="courses-btn">Add</button>
//         </form>
//       )}

//       <div className="courses-topbar">
//         <input
//           className="courses-search"
//           type="search"
//           placeholder="Search course name/code..."
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//         />
//       </div>

//       <table className="courses-table">
//         <thead>
//           <tr>
//             <th>Course Name</th>
//             <th>Code</th>
//             <th>Instructor</th>
//             <th>Seats</th>
//           </tr>
//         </thead>
//         <tbody>
//           {filteredCourses.map((course) => (
//             <tr key={course.id}>
//               <td>{course.name}</td>
//               <td>{course.code}</td>
//               <td>{course.instructor}</td>
//               <td>{course.seats}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }
