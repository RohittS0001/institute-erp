import React, { useState } from 'react';
import axios from 'axios';
import './ForgotPassword.css'; // Make sure you have the CSS

const ForgotPassword = () => {
  const [input, setInput] = useState("");
  const [msg, setMsg] = useState("");

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:4000/api/user/forgot-password", { input });
      setMsg("If your account exists, you'll receive a reset link/code soon.");
    } catch (err) {
      setMsg("Error: " + (err.response?.data?.error || "Unknown error"));
    }
  };

  return (
    <div className="forgot-password-container">
      <form className="forgot-password-form" onSubmit={handleSubmit}>
        <h2 className="forgot-password-title">Forgot Password</h2>
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Enter phone or email"
          required
        />
        <button type="submit">Send Reset Link</button>
        <div className="msg">{msg}</div>
      </form>
    </div>
  );
};

export default ForgotPassword;
