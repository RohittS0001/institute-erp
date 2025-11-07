import React from "react";
import "./Profile.css";

export default function Profile() {
  return (
    <div className="page-container">
      <h2>My Profile</h2>
      <p>Manage your personal details, update contact info, and view your profile summary.</p>

      <div className="profile-card">
        <h4>Name: Prajay Fal Desai</h4>
        <p>Email: prajay@example.com</p>
        <p>Membership: Active</p>
        <button className="edit-btn">Edit Profile</button>
      </div>
    </div>
  );
}