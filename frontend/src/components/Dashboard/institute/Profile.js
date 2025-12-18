import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Profile.css";

export default function Profile() {
  const [profile, setProfile] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({});
  const navigate = useNavigate();

  // Load profile from backend
  useEffect(() => {
    axios.get("https://backenderp-production-6374.up.railway.app/api/institute/profile/me")
      .then(res => {
        setProfile(res.data);
        setForm(res.data);
      })
      .catch(err => console.log(err));
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    axios.put("https://backenderp-production-6374.up.railway.app/api/institute/profile/update", form)
      .then(res => {
        setProfile(res.data.profile);
        setEditMode(false);
      })
      .catch(err => console.log(err));
  };

  const handleCancel = () => {
    setForm(profile);
    setEditMode(false);
  };

  if (!profile) return <div className="loading">Loading...</div>;

  return (
    <div className="profile-page">
      <div className="profile-header">
        <h2>Institute Profile</h2>
        <button className="profile-btn" onClick={() => navigate("/dashboard/institute")}>
          ← Dashboard
        </button>
      </div>
      
      <div className="profile-card">
        <div className="profile-row">
          <div className="profile-field">
            <span className="profile-label">Institute Name</span>
            {editMode ? (
              <input type="text" name="instituteName" value={form.instituteName} onChange={handleChange} />
            ) : (
              <span className="profile-value">{profile.instituteName}</span>
            )}
          </div>

          <div className="profile-field">
            <span className="profile-label">Admin Name</span>
            {editMode ? (
              <input type="text" name="adminName" value={form.adminName} onChange={handleChange} />
            ) : (
              <span className="profile-value">{profile.adminName}</span>
            )}
          </div>
        </div>

        <div className="profile-row">
          <div className="profile-field">
            <span className="profile-label">Email</span>
            {editMode ? (
              <input type="email" name="email" value={form.email} onChange={handleChange} />
            ) : (
              <span className="profile-value">{profile.email}</span>
            )}
          </div>

          <div className="profile-field">
            <span className="profile-label">Phone</span>
            {editMode ? (
              <input type="text" name="phone" value={form.phone} onChange={handleChange} />
            ) : (
              <span className="profile-value">{profile.phone}</span>
            )}
          </div>
        </div>

        <div className="profile-row">
          <div className="profile-field full-width">
            <span className="profile-label">Address</span>
            {editMode ? (
              <input type="text" name="address" value={form.address} onChange={handleChange} />
            ) : (
              <span className="profile-value">{profile.address}</span>
            )}
          </div>
        </div>
      </div>

      <div className="profile-actions">
        {editMode ? (
          <>
            <button className="profile-btn" onClick={handleSave}>Save</button>
            <button className="profile-btn" onClick={handleCancel}>Cancel</button>
          </>
        ) : (
          <button className="profile-btn" onClick={() => setEditMode(true)}>Edit Profile</button>
        )}
      </div>
    </div>
  );
}

