import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Faculty.css";

export default function Faculty() {
  const [faculty, setFaculty] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:4000/api/institute/faculty/all")
      .then((res) => setFaculty(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="faculty-page">
      <h2>Faculty Members</h2>

      <div className="faculty-list">
        {faculty.map((f) => (
          <div key={f.id} className="faculty-card">
            <h3>{f.name}</h3>
            <p>{f.department}</p>
            <p>{f.designation}</p>
            <p>{f.email}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
