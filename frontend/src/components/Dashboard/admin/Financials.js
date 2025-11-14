import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Financials.css";

const Financials = () => {
  const [transactions, setTransactions] = useState([]);
  const [filterStatus, setFilterStatus] = useState("All");

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/admin/financials");
        setTransactions(response.data);
      } catch (error) {
        console.error("Error fetching transactions:", error);
        setTransactions([]);
      }
    };
    fetchTransactions();
  }, []);

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
          <option value="Paid">Completed</option>
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
              <tr key={txn.id || txn._id}>
                <td>{txn.type}</td>
                <td>{txn.institute}</td>
                <td>${txn.amount.toFixed(2)}</td>
                <td>{new Date(txn.date).toLocaleDateString()}</td>
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
