import React, { useState } from "react";
import "./Reports.css";

const reportTypes = ["Attendance", "Enrollment", "Financial", "Performance", "Custom"];

const Reports = () => {
  const [selectedReport, setSelectedReport] = useState(reportTypes[0]);
  const [dateRange, setDateRange] = useState({ from: "", to: "" });

  const handleReportChange = (e) => {
    setSelectedReport(e.target.value);
  };

  const handleDateChange = (e) => {
    setDateRange({ ...dateRange, [e.target.name]: e.target.value });
  };

  const handleGenerate = (e) => {
    e.preventDefault();
    alert(`Generating ${selectedReport} report from ${dateRange.from} to ${dateRange.to}`);
    // In real app, trigger API call here
  };

  return (
    <div className="page-content">
      <h1>Reports & Analytics</h1>
      <form className="report-form" onSubmit={handleGenerate}>
        <label>
          Select Report Type:
          <select value={selectedReport} onChange={handleReportChange}>
            {reportTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </label>

        <label>
          From:
          <input type="date" name="from" value={dateRange.from} onChange={handleDateChange} required />
        </label>

        <label>
          To:
          <input type="date" name="to" value={dateRange.to} onChange={handleDateChange} required />
        </label>

        <button type="submit" className="generate-btn">
          Generate Report
        </button>
      </form>

      <section className="report-placeholder">
        <p>
          Generated reports will appear here once implemented.  
          Use the form above to select report type and date range.
        </p>
      </section>
    </div>
  );
};

export default Reports;
