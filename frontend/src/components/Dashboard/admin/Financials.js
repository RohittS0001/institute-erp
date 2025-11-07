import React, { useState } from "react";
import "./Financials.css";

const initialTransactions = [
  {
    id: 1,
    type: "Payment",
    institute: "Institute A",
    amount: 1200,
    date: "2025-11-01",
    status: "Completed",
  },
  {
    id: 2,
    type: "Invoice",
    institute: "Institute B",
    amount: 500,
    date: "2025-10-25",
    status: "Pending",
  },
  {
    id: 3,
    type: "Payment",
    institute: "Institute C",
    amount: 750,
    date: "2025-10-20",
    status: "Completed",
  },
];

const Financials = () => {
  const [transactions, setTransactions] = useState(initialTransactions);
  const [filterStatus, setFilterStatus] = useState("All");

  // Filter transactions by status
  const filteredTransactions =
    filterStatus === "All"
      ? transactions
      : transactions.filter((t) => t.status === filterStatus);

  return (
    <div className="page-content">
      <h1>Financial Overview</h1>

      <div className="filter-bar">
        <label htmlFor="statusFilter">Filter by Status: </label>
        <select
          id="statusFilter"
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option value="All">All</option>
          <option value="Completed">Completed</option>
          <option value="Pending">Pending</option>
          <option value="Failed">Failed</option>
        </select>
      </div>

      <table className="transactions-table">
        <thead>
          <tr>
            <th>Type</th>
            <th>Institute</th>
            <th>Amount</th>
            <th>Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {filteredTransactions.length ? (
            filteredTransactions.map((txn) => (
              <tr key={txn.id}>
                <td>{txn.type}</td>
                <td>{txn.institute}</td>
                <td>${txn.amount.toFixed(2)}</td>
                <td>{txn.date}</td>
                <td>
                  <span className={`status-label ${txn.status.toLowerCase()}`}>
                    {txn.status}
                  </span>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" style={{ textAlign: "center", padding: "20px" }}>
                No transactions found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Financials;
