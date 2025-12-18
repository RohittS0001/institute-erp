import React, { useState } from "react";
import axios from "axios";
import "./Reports.css";

const reportTypes = ["Attendance", "Enrollment", "Financial", "Performance", "Custom"];

const Reports = () => {
  const [selectedReport, setSelectedReport] = useState(reportTypes[0]);
  const [dateRange, setDateRange] = useState({ from: "", to: "" });
  const [loading, setLoading] = useState(false);
  const [reportData, setReportData] = useState(null);
  const [error, setError] = useState(null);

  const handleReportChange = (e) => {
    setSelectedReport(e.target.value);
    setReportData(null);
    setError(null);
  };

  const handleDateChange = (e) => {
    setDateRange({ ...dateRange, [e.target.name]: e.target.value });
    setReportData(null);
    setError(null);
  };

  const handleGenerate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setReportData(null);

    try {
      const response = await axios.post("https://backenderp-production-6374.up.railway.app/api/admin/reports", {
        type: selectedReport,
        from: dateRange.from,
        to: dateRange.to,
      });
      setReportData(response.data);
    } catch (err) {
      setError("Failed to generate report. Please try again.");
    } finally {
      setLoading(false);
    }
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

        <button type="submit" className="generate-btn" disabled={loading}>
          {loading ? "Generating..." : "Generate Report"}
        </button>
      </form>

      <section className="report-placeholder">
        {error && <p className="error-msg">{error}</p>}
        {reportData ? (
          <pre>{JSON.stringify(reportData, null, 2)}</pre>
        ) : (
          <p>
            Generated reports will appear here once implemented.
            Use the form above to select report type and date range.
          </p>
        )}
      </section>
    </div>
  );
};

export default Reports;
