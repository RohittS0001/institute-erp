import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Financials.css";

const Financials = () => {
  const [transactions, setTransactions] = useState([]);
  const [filterStatus, setFilterStatus] = useState("All");
  const [showAddForm, setShowAddForm] = useState(false);
  const [newTransaction, setNewTransaction] = useState({
    type: "",
    institute: "",
    amount: "",
    date: "",
    status: "Pending",
  });
  const [editId, setEditId] = useState(null);
  const [editTransaction, setEditTransaction] = useState({
    type: "",
    institute: "",
    amount: "",
    date: "",
    status: "",
  });

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

  // Handle add form input change
  const handleNewChange = (e) => {
    const { name, value } = e.target;
    setNewTransaction((prev) => ({ ...prev, [name]: value }));
  };

  // Handle edit form input change
  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditTransaction((prev) => ({ ...prev, [name]: value }));
  };

  // Add new transaction
  const handleAddTransaction = async (e) => {
    e.preventDefault();
    if (!newTransaction.type.trim() || !newTransaction.institute.trim()) {
      alert("Please fill in required fields");
      return;
    }
    try {
      const response = await axios.post("http://localhost:4000/api/admin/financials", newTransaction);
      setTransactions((prev) => [...prev, response.data]);
      setNewTransaction({
        type: "",
        institute: "",
        amount: "",
        date: "",
        status: "Pending",
      });
      setShowAddForm(false);
    } catch (error) {
      console.error("Error adding transaction:", error);
      alert("Failed to add transaction");
    }
  };

  // Delete transaction
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this transaction?")) return;
    try {
      await axios.delete(`http://localhost:4000/api/admin/financials/${id}`);
      setTransactions((prev) => prev.filter((t) => (t.id || t._id) !== id));
    } catch (error) {
      console.error("Failed to delete transaction:", error);
      alert("Failed to delete transaction");
    }
  };

  // Enter edit mode
  const handleEdit = (txn) => {
    setEditId(txn.id || txn._id);
    setEditTransaction({
      type: txn.type,
      institute: txn.institute,
      amount: txn.amount,
      date: txn.date ? new Date(txn.date).toISOString().slice(0, 10) : "",
      status: txn.status,
    });
  };

  // Save edited transaction
  const handleSave = async (id) => {
    try {
      const response = await axios.put(
        `http://localhost:4000/api/admin/financials/${id}`,
        editTransaction
      );
      setTransactions((prev) =>
        prev.map((txn) => (txn.id || txn._id) === id ? response.data : txn)
      );
      setEditId(null);
    } catch (error) {
      console.error("Failed to update transaction:", error);
      alert("Failed to update transaction");
    }
  };

  const toggleAddForm = () => setShowAddForm((prev) => !prev);
  const cancelEdit = () => setEditId(null);

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
        <button onClick={toggleAddForm} className="add-btn">
          {showAddForm ? "Close Form" : "Add New Transaction"}
        </button>
      </div>

      {showAddForm && (
        <form onSubmit={handleAddTransaction} className="add-form">
          <input
            name="type"
            placeholder="Type"
            value={newTransaction.type}
            onChange={handleNewChange}
            required
          />
          <input
            name="institute"
            placeholder="Institute"
            value={newTransaction.institute}
            onChange={handleNewChange}
            required
          />
          <input
            name="amount"
            type="number"
            placeholder="Amount"
            value={newTransaction.amount}
            onChange={handleNewChange}
          />
          <input
            name="date"
            type="date"
            value={newTransaction.date}
            onChange={handleNewChange}
          />
          <select
            name="status"
            value={newTransaction.status}
            onChange={handleNewChange}
          >
            <option value="Paid">Completed</option>
            <option value="Pending">Pending</option>
            <option value="Failed">Failed</option>
          </select>
          <button type="submit" className="submit-btn">Save Transaction</button>
        </form>
      )}

      <table className="transactions-table">
        <thead>
          <tr>
            <th>Type</th>
            <th>Institute</th>
            <th>Amount</th>
            <th>Date</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredTransactions.length ? (
            filteredTransactions.map((txn) =>
              editId === (txn.id || txn._id) ? (
                <tr key={txn.id || txn._id}>
                  <td>
                    <input
                      name="type"
                      value={editTransaction.type}
                      onChange={handleEditChange}
                      required
                    />
                  </td>
                  <td>
                    <input
                      name="institute"
                      value={editTransaction.institute}
                      onChange={handleEditChange}
                      required
                    />
                  </td>
                  <td>
                    <input
                      name="amount"
                      type="number"
                      value={editTransaction.amount}
                      onChange={handleEditChange}
                    />
                  </td>
                  <td>
                    <input
                      name="date"
                      type="date"
                      value={editTransaction.date}
                      onChange={handleEditChange}
                    />
                  </td>
                  <td>
                    <select
                      name="status"
                      value={editTransaction.status}
                      onChange={handleEditChange}
                    >
                      <option value="Paid">Completed</option>
                      <option value="Pending">Pending</option>
                      <option value="Failed">Failed</option>
                    </select>
                  </td>
                  <td>
                    <button
                      className="submit-btn"
                      onClick={() => handleSave(txn.id || txn._id)}
                    >
                      Save
                    </button>
                    <button className="cancel-btn" onClick={cancelEdit}>
                      Cancel
                    </button>
                  </td>
                </tr>
              ) : (
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
                  <td>
                    <button className="edit-B" onClick={() => handleEdit(txn)}>Edit</button>
                    <button
                      className="delete-B"
                      onClick={() => handleDelete(txn.id || txn._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              )
            )
          ) : (
            <tr>
              <td colSpan="6" style={{ textAlign: "center", padding: "20px" }}>
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
