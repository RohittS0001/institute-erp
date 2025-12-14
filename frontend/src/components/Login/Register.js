import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Register.css';

const Register = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    role: ""
  });
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }
    if (!form.role) {
      setError("Please select a role.");
      return;
    }
    try {
      await axios.post("https://backenderp-production-fe2b.up.railway.app/api/user/register", {
        name: form.name,
        email: form.email,
        password: form.password,
        phone: form.phone,
        role: form.role
      });
      setMsg("Registration successful! You can now log in.");
      setError("");
      navigate("/login");
    } catch (err) {
      setMsg("Failed: " + (err.response?.data?.error || "Unknown error"));
    }
  };

  return (
    <div className="register-container">
      <form className="register-form" onSubmit={handleSubmit}>
        <h2 className="register-title">Register</h2>
        <select
          name="role"
          value={form.role}
          onChange={handleChange}
          required
          style={{ marginBottom: 17, padding: "13px 12px", borderRadius: 8, border: "1.5px solid #dde6fa" }}
        >
          <option value="">Select Role</option>
          <option value="admin">Admin</option>
          <option value="user">User</option>
          <option value="institute">Institute</option>
        </select>
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Name"
          required
        />
        <input
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
          type="email"
          required
        />
        <input
          name="phone"
          value={form.phone}
          onChange={handleChange}
          placeholder="Phone Number"
          required
        />
        <input
          name="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Password"
          type="password"
          required
        />
        <input
          name="confirmPassword"
          value={form.confirmPassword}
          onChange={handleChange}
          placeholder="Rewrite Password"
          type="password"
          required
        />
        <button type="submit">Register</button>
        <div className={error ? "error-message" : "success-message"}>
          {error ? error : msg}
        </div>
      </form>
    </div>
  );
};

export default Register;
