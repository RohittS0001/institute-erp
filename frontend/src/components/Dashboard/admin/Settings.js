import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Settings.css";

const defaultSettings = {
  systemName: "ERP Dashboard",
  logoUrl: "",
  theme: "light",
  language: "en",
  passwordExpiryDays: 90,
  twoFactorAuth: false,
  allowedLoginIPs: "",
  integrationEmail: "admin@example.com",
  integrationSMS: true,
  enableAPIAccess: false,
  apiKey: "",
  notificationFrequency: "daily",
  backupEnabled: true,
  backupSchedule: "weekly",
  auditLogging: true,
};

const languages = [
  { value: "en", label: "English" },
  { value: "hi", label: "Hindi" },
  { value: "es", label: "Spanish" },
];

const themes = [
  { value: "light", label: "Light" },
  { value: "dark", label: "Dark" },
  { value: "auto", label: "Auto" },
];

const notificationFrequencies = [
  { value: "off", label: "Off" },
  { value: "real-time", label: "Real-time" },
  { value: "daily", label: "Daily" },
  { value: "weekly", label: "Weekly" },
];

const backupSchedules = [
  { value: "daily", label: "Daily" },
  { value: "weekly", label: "Weekly" },
  { value: "monthly", label: "Monthly" },
];

const Settings = () => {
  const [settings, setSettings] = useState(defaultSettings);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/admin/settings");
        setSettings(response.data);
      } catch (err) {
        setError("Failed to load settings");
      } finally {
        setLoading(false);
      }
    };
    fetchSettings();
  }, []);

  const handleChange = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      await axios.post("http://localhost:4000/api/admin/settings", settings);
      alert("Settings saved successfully!");
    } catch (err) {
      setError("Failed to save settings. Please try again.");
    }
  };

  if (loading) {
    return <div className="page-content">Loading settings...</div>;
  }

  return (
    <div className="page-content">
      <h1>System Settings</h1>
      {error && <div className="error-msg">{error}</div>}
      <form className="settings-form" onSubmit={handleSubmit}>
        {/* Existing form UI unchanged, just replace onChange handlers */}
        {/* Your form fields remain the same */}
        {/* Form fields with onChange calling handleChange */}
        {/* ... */}
      </form>
    </div>
  );
};

export default Settings;
