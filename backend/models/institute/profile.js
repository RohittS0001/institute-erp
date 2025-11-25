import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Profile.css";

export default function Profile() {
  const [editMode, setEditMode] = useState(false);
  const [profile, setProfile] = useState({
    name: "",
    email: "", 
    phone: "",
    role: "",
    department: "",
    address: "",
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  // GET PROFILE
  const fetchProfile = async () => {
    try {
      const res = await axios.get("http://localhost:4000/api/profile/me");
      setProfile(res.data);
    } catch (err) {
      console.error("Error fetching profile:", err);
    }
  };

  // HANDLE INPUT CHANGE
  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  // UPDATE PROFILE
  const updateProfile = async () => {
    try {
      await axios.put("http://localhost:4000/api/profile/update", profile);
      alert("Profile updated successfully");
      setEditMode(false);
      fetchProfile();
    } catch (err) {
      console.error("Error updating profile:", err);
      alert("Failed to update profile");
    }
  };

  return (
    <div className="profile-container">
      <h2 className="profile-title">My Profile</h2>

      <div className="profile-card">

        <div className="profile-photo">
          <img
            src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
            alt="Profile avatar"
          />
        </div>

        <div className="profile-info">
          {editMode ? (
            <>
              <input
                name="name"
                value={profile.name}
                onChange={handleChange}
                placeholder="Enter name"
              />
              <input
                name="email"
                value={profile.email}
                onChange={handleChange}
                placeholder="Enter email"
              />
              <input
                name="phone"
                value={profile.phone}
                onChange={handleChange}
                placeholder="Enter phone"
              />
              <input
                name="role"
                value={profile.role}
                onChange={handleChange}
                placeholder="Enter role"
              />
              <input
                name="department"
                value={profile.department}
                onChange={handleChange}
                placeholder="Enter department"
              />
              <input
                name="address"
                value={profile.address}
                onChange={handleChange}
                placeholder="Enter address"
              />

              <button className="save-btn" onClick={updateProfile}>
                Save Changes
              </button>
              <button
                className="cancel-btn"
                onClick={() => setEditMode(false)}
              >
                Cancel
              </button>
            </>
          ) : (
            <>
              <p><strong>Name:</strong> {profile.name}</p>
              <p><strong>Email:</strong> {profile.email}</p>
              <p><strong>Phone:</strong> {profile.phone}</p>
              <p><strong>Role:</strong> {profile.role}</p>
              <p><strong>Department:</strong> {profile.department}</p>
              <p><strong>Address:</strong> {profile.address}</p>

              <button
                className="edit-btn"
                onClick={() => setEditMode(true)}
              >
                Edit Profile
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
