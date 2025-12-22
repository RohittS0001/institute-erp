import React, { useEffect, useState } from "react";
import axios from "axios";
import "./AdminImmersion.css";

const API_BASE =
  "https://backenderp-production-6374.up.railway.app/api";

const AdminImmersion = () => {
  // Section 1 – immersion records
  const [immersions, setImmersions] = useState([]);
  const [immSearch, setImmSearch] = useState("");

  // Section 2 – Academic → Industry applications
  const [academicToIndustry, setAcademicToIndustry] = useState([]);
  const [a2iSearch, setA2iSearch] = useState("");

  // Section 2 – Industry → Academic applications
  const [industryToAcademic, setIndustryToAcademic] = useState([]);
  const [i2aSearch, setI2aSearch] = useState("");

  useEffect(() => {
    const loadAll = async () => {
      try {
        const [immRes, a2iRes, i2aRes] = await Promise.all([
          axios.get(`${API_BASE}/immersion`), // same as user
          axios.get(`${API_BASE}/immersion/academic-to-industry`), // you create
          axios.get(`${API_BASE}/immersion/industry-to-academic`), // you create
        ]);

        setImmersions(immRes.data || []);
        setAcademicToIndustry(a2iRes.data || []);
        setIndustryToAcademic(i2aRes.data || []);
      } catch (err) {
        console.error("Admin immersion load error:", err);
      }
    };

    loadAll();
  }, []);

  // simple filters
  const filteredImmersions = immersions.filter((item) => {
    const q = immSearch.toLowerCase();
    return (
      item.program?.toLowerCase().includes(q) ||
      item.institution?.toLowerCase().includes(q) ||
      item.description?.toLowerCase().includes(q)
    );
  });

  const filteredA2I = academicToIndustry.filter((item) => {
    const q = a2iSearch.toLowerCase();
    return (
      item.industryName?.toLowerCase().includes(q) ||
      item.industryEmail?.toLowerCase().includes(q) ||
      item.industryLocation?.toLowerCase().includes(q)
    );
  });

  const filteredI2A = industryToAcademic.filter((item) => {
    const q = i2aSearch.toLowerCase();
    return (
      item.academicName?.toLowerCase().includes(q) ||
      item.academicEmail?.toLowerCase().includes(q) ||
      item.academicLocation?.toLowerCase().includes(q)
    );
  });

  return (
    <div className="imm-admin-page">
      <h1>Immersion Overview</h1>

      {/* SECTION 1 – Immersion records */}
      <section className="imm-admin-section">
        <div className="imm-admin-header">
          <h2>Immersion Records</h2>
          <input
            type="search"
            className="imm-admin-search"
            placeholder="Search program, institution, description..."
            value={immSearch}
            onChange={(e) => setImmSearch(e.target.value)}
          />
        </div>

        <table className="imm-admin-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Program</th>
              <th>Institution</th>
              <th>Start</th>
              <th>End</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {filteredImmersions.length ? (
              filteredImmersions.map((item, index) => (
                <tr key={item.id || item._id || index}>
                  <td>{index + 1}</td>
                  <td>{item.program}</td>
                  <td>{item.institution}</td>
                  <td>{item.startDate}</td>
                  <td>{item.endDate}</td>
                  <td>{item.description}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" style={{ textAlign: "center", padding: "10px" }}>
                  No immersion records found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </section>

      {/* SECTION 2 – Academic → Industry */}
      <section className="imm-admin-section">
        <div className="imm-admin-header">
          <h2>Academic → Industry Applications</h2>
          <input
            type="search"
            className="imm-admin-search"
            placeholder="Search by industry, email, location..."
            value={a2iSearch}
            onChange={(e) => setA2iSearch(e.target.value)}
          />
        </div>

        <table className="imm-admin-table small-font">
          <thead>
            <tr>
              <th>#</th>
              <th>Industry Name</th>
              <th>Email</th>
              <th>Contact</th>
              <th>Location</th>
              <th>Skills / Subjects</th>
              <th>Experience Looking For</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {filteredA2I.length ? (
              filteredA2I.map((item, index) => (
                <tr key={item.id || item._id || index}>
                  <td>{index + 1}</td>
                  <td>{item.industryName}</td>
                  <td>{item.industryEmail}</td>
                  <td>{item.industryContact}</td>
                  <td>{item.industryLocation}</td>
                  <td>{item.industrySkillsSubjects}</td>
                  <td>{item.industryExperienceLookingFor}</td>
                  <td>{item.industryDescription}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" style={{ textAlign: "center", padding: "10px" }}>
                  No Academic → Industry applications found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </section>

      {/* SECTION 3 – Industry → Academic */}
      <section className="imm-admin-section">
        <div className="imm-admin-header">
          <h2>Industry → Academic Applications</h2>
          <input
            type="search"
            className="imm-admin-search"
            placeholder="Search by institute, email, location..."
            value={i2aSearch}
            onChange={(e) => setI2aSearch(e.target.value)}
          />
        </div>

        <table className="imm-admin-table small-font">
          <thead>
            <tr>
              <th>#</th>
              <th>Institute / University</th>
              <th>Contact</th>
              <th>Email</th>
              <th>Location</th>
              <th>Programs</th>
              <th>Specialization</th>
              <th>Subject</th>
            </tr>
          </thead>
          <tbody>
            {filteredI2A.length ? (
              filteredI2A.map((item, index) => (
                <tr key={item.id || item._id || index}>
                  <td>{index + 1}</td>
                  <td>{item.academicName}</td>
                  <td>{item.academicContact}</td>
                  <td>{item.academicEmail}</td>
                  <td>{item.academicLocation}</td>
                  <td>{item.academicPrograms}</td>
                  <td>{item.academicSpecialization}</td>
                  <td>{item.academicSubject}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" style={{ textAlign: "center", padding: "10px" }}>
                  No Industry → Academic applications found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default AdminImmersion;
