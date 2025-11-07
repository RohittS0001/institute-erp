import React, { useState } from 'react';
import Sidebar from './Sidebar';
import './admin.css';

const widgetsData = [
  { title: 'Total Institutes', value: 15, icon: '🏫', color: '#5c71e7ff' },
  { title: 'Active Users', value: 4500, icon: '👥', color: '#f50057' },
  { title: 'Courses Offered', value: 200, icon: '📚', color: '#ff9800' },
  { title: 'Pending Approvals', value: 12, icon: '⏳', color: '#009688' },
];

const institutes = [
  { id: 1, name: 'Institute A', location: 'New York', status: 'Active' },
  { id: 2, name: 'Institute B', location: 'California', status: 'Active' },
  { id: 3, name: 'Institute C', location: 'Texas', status: 'Inactive' },
  { id: 4, name: 'Institute D', location: 'Florida', status: 'Active' },
];

const AdminDashboard = () => {
  const [search, setSearch] = useState('');

  const filteredInstitutes = institutes.filter(
    (inst) =>
      inst.name.toLowerCase().includes(search.toLowerCase()) ||
      inst.location.toLowerCase().includes(search.toLowerCase()) ||
      inst.status.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="dashboard-wrapper">
      <Sidebar />
      <main className="dashboard-content">
        <header className="dashboard-header">
          <h1>Admin</h1>
          <input
            type="text"
            placeholder="Search institutes..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="search-input"
          />
        </header>

        <section className="widgets-section">
          {widgetsData.map((w) => (
            <div key={w.title} className="widget-card" style={{ borderTop: `4px solid ${w.color}` }}>
              <div className="widget-icon" style={{ backgroundColor: w.color }}>
                {w.icon}
              </div>
              <div className="widget-info">
                <h3>{w.value.toLocaleString()}</h3>
                <p>{w.title}</p>
              </div>
            </div>
          ))}
        </section>

        <section className="institutes-table-section">
          <h2>Institutes Overview</h2>
          <table className="institutes-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Location</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredInstitutes.length ? (
                filteredInstitutes.map((inst) => (
                  <tr key={inst.id}>
                    <td>{inst.name}</td>
                    <td>{inst.location}</td>
                    <td>
                      <span className={`status-indicator ${inst.status.toLowerCase()}`}>
                        {inst.status}
                      </span>
                    </td>
                    <td>
                      <button className="btn view-btn">View</button>
                      <button className="btn edit-btn">Edit</button>
                      <button className="btn delete-btn">Delete</button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" style={{ textAlign: 'center', padding: '20px' }}>
                    No institutes found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </section>
      </main>
    </div>
  );
};

export default AdminDashboard;
