import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Reports.css";

export default function Reports() {
  const [reports, setReports] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  // Fetch reports from backend
  useEffect(() => {
    fetch("http://localhost:5000/api/reports")
      .then(res => res.json())
      .then(data => setReports(data));
  }, []);

  const filteredReports = reports.filter(
    (rep) =>
      rep.title.toLowerCase().includes(search.toLowerCase()) ||
      rep.type.toLowerCase().includes(search.toLowerCase()) ||
      rep.details.toLowerCase().includes(search.toLowerCase())
  );

  // Download single report
  const downloadReport = (id, type) => {
    window.open(`http://localhost:5000/api/reports/download/${type}/${id}`);
  };

  // Download all reports
  const handleDownloadAll = (type) => {
    window.open(`http://localhost:5000/api/reports/download/${type}/1`);
  };

  return (
    <div className="reports-page">
      <div className="reports-header">
        <h2>Institute Reports & Analytics</h2>
        <button className="reports-btn" onClick={() => navigate("/")}>
          ← Dashboard
        </button>
      </div>

      <div className="reports-search-group">
        <input
          className="reports-search"
          type="search"
          placeholder="Search reports by title, type..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="reports-list-wrapper">
        <table className="reports-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Type</th>
              <th>Last Updated</th>
              <th>Details</th>
              <th>Download</th>
            </tr>
          </thead>
          <tbody>
            {filteredReports.map((rep) => (
              <tr key={rep.id}>
                <td>{rep.title}</td>
                <td>{rep.type}</td>
                <td>{rep.updated}</td>
                <td>{rep.details}</td>
                <td className="reports-download-cell">
                  <button
                    className="reports-btn mini"
                    onClick={() => downloadReport(rep.id, "pdf")}
                  >
                    PDF
                  </button>
                  <button
                    className="reports-btn mini"
                    onClick={() => downloadReport(rep.id, "excel")}
                  >
                    Excel
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="reports-actionbox">
        <button
          className="reports-btn"
          onClick={() => handleDownloadAll("pdf")}
        >
          Export ALL as PDF
        </button>
        <button
          className="reports-btn"
          onClick={() => handleDownloadAll("excel")}
        >
          Export ALL as Excel
        </button>
      </div>
    </div>
  );
}



// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import "./Reports.css";

// const dummyReports = [
//   { id: 1, title: "Attendance Summary", updated: "2025-11-13", type: "Attendance", details: "View overall attendance stats" },
//   { id: 2, title: "Course Enrollment", updated: "2025-11-10", type: "Courses", details: "Total students per course" },
//   { id: 3, title: "Faculty Activity", updated: "2025-11-09", type: "Faculty", details: "Teaching hours and events" }
// ];

// function downloadReport(report, type) {
//   // Dummy download logic—should actually export or navigate to file download in real app
//   alert(`Downloading ${report.title} as ${type}...`);
// }

// export default function Reports() {
//   const [search, setSearch] = useState("");
//   const navigate = useNavigate();

//   const filteredReports = dummyReports.filter(
//     (rep) =>
//       rep.title.toLowerCase().includes(search.toLowerCase()) ||
//       rep.type.toLowerCase().includes(search.toLowerCase()) ||
//       rep.details.toLowerCase().includes(search.toLowerCase())
//   );

//   // Download all (dummy action)
//   const handleDownloadAll = (type) => {
//     alert(`Downloading all reports as ${type}...`);
//   };

//   return (
//     <div className="reports-page">
//       <div className="reports-header">
//         <h2>Institute Reports & Analytics</h2>
//         <button className="reports-btn" onClick={() => navigate("/")}>
//           ← Dashboard
//         </button>
//       </div>
//       <div className="reports-search-group">
//         <input
//           className="reports-search"
//           type="search"
//           placeholder="Search reports by title, type..."
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//         />
//       </div>
//       <div className="reports-list-wrapper">
//         <table className="reports-table">
//           <thead>
//             <tr>
//               <th>Title</th>
//               <th>Type</th>
//               <th>Last Updated</th>
//               <th>Details</th>
//               <th>Download</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredReports.map((rep) => (
//               <tr key={rep.id}>
//                 <td>{rep.title}</td>
//                 <td>{rep.type}</td>
//                 <td>{rep.updated}</td>
//                 <td>{rep.details}</td>
//                 <td className="reports-download-cell">
//                   <button className="reports-btn mini" onClick={() => downloadReport(rep, "PDF")}>
//                     PDF
//                   </button>
//                   <button className="reports-btn mini" onClick={() => downloadReport(rep, "Excel")}>
//                     Excel
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//       <div className="reports-actionbox">
//         <button className="reports-btn" onClick={() => handleDownloadAll("PDF")}>Export ALL as PDF</button>
//         <button className="reports-btn" onClick={() => handleDownloadAll("Excel")}>Export ALL as Excel</button>
//       </div>
//     </div>
//   );
// }
