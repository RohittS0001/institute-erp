import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Reports.css";

export default function Reports() {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    axios
      .get("https://backenderp-production-6374.up.railway.app/api/institute/reports/all")
      .then((res) => setReports(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="reports-page">
      <h2>Reports</h2>

      <div className="reports-list">
        {reports.map((r) => (
          <div key={r.id} className="report-card">
            <h3>{r.title}</h3>
            <p>{r.description}</p>
            <small>{r.created_at}</small>
          </div>
        ))}
      </div>
    </div>
  );
}
