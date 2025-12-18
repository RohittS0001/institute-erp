// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import "./Courses.css";

// export default function Courses() {
//   const [search, setSearch] = useState("");
//   const [courses, setCourses] = useState([]);
//   const [showAdd, setShowAdd] = useState(false);
//   const [form, setForm] = useState({ name: "", code: "", instructor: "", seats: "" });
//   const navigate = useNavigate();

//   // GET all courses
//   const fetchCourses = async () => {
//     try {
//       const res = await axios.get("http://localhost:5000/api/institute/course/all");
//       setCourses(res.data);
//     } catch (err) {
//       console.log("Error fetching courses", err);
//     }
//   };

//   useEffect(() => {
//     fetchCourses();
//   }, []);

//   // ADD course
//   const handleAdd = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.post("http://localhost:4000/api/institute/course/add", form);
//       setForm({ name: "", code: "", instructor: "", seats: "" });
//       setShowAdd(false);
//       fetchCourses();
//     } catch (err) {
//       console.log("Error adding course");
//     }
//   };

//   const filteredCourses = courses.filter(
//     (course) =>
//       course.name.toLowerCase().includes(search.toLowerCase()) ||
//       course.code.toLowerCase().includes(search.toLowerCase())
//   );

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
//             <tr key={course._id}>
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



import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Courses.css";

export default function Courses() {
  const [search, setSearch] = useState("");
  const [courses, setCourses] = useState([]);
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState({
    name: "",
    code: "",
    instructor: "",
    seats: "",
  });

  const navigate = useNavigate();

  // BASE URL (make sure your backend runs on this)
  const API = "https://backenderp-production-6374.up.railway.app/api/institute/course";

  // GET all courses
  const fetchCourses = async () => {
    try {
      const res = await axios.get(`${API}/all`);
      setCourses(res.data);
    } catch (err) {
      console.error("Error fetching courses:", err);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  // ADD course
  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API}/add`, form);

      setForm({ name: "", code: "", instructor: "", seats: "" });
      setShowAdd(false);
      fetchCourses();
    } catch (err) {
      console.error("Error adding course:", err);
      alert("Failed to add course. Check backend route or port.");
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

          <button className="courses-btn" onClick={() => setShowAdd(!showAdd)}>
            + Add Course
          </button>
        </div>
      </div>

      {/* ADD COURSE FORM */}
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
            min={1}
            value={form.seats}
            onChange={(e) => setForm({ ...form, seats: e.target.value })}
            required
          />

          <button type="submit" className="courses-btn">
            Add
          </button>
        </form>
      )}

      {/* SEARCH BAR */}
      <div className="courses-topbar">
        <input
          className="courses-search"
          type="search"
          placeholder="Search course name/code..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* COURSES TABLE */}
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
