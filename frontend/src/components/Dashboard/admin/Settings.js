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

const themes = [
  { value: "light", label: "Light" },
  { value: "dark", label: "Dark" },
  { value: "auto", label: "Auto" },
];

const languages = [
  { value: "en", label: "English" },
  { value: "hi", label: "Hindi" },
  { value: "es", label: "Spanish" },
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
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/admin/settings");
        setSettings(response.data);
      } catch (err) {
        setError("Failed to load settings.");
      } finally {
        setLoading(false);
      }
    };
    fetchSettings();
  }, []);

  const handleChange = (key, value) => setSettings((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);
    try {
      await axios.post("http://localhost:4000/api/admin/settings", settings);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 2000);
    } catch (err) {
      setError("Failed to save settings. Please try again.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  if (loading) return <div className="settings-page"><div className="settings-loading">Loading...</div></div>;

  return (
    <div className="settings-page">
      <div className="settings-container">
        <h2 className="settings-header">System Settings</h2>
        <form className="settings-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>System Name</label>
            <input type="text" value={settings.systemName} onChange={e => handleChange("systemName", e.target.value)} />
          </div>
          <div className="form-group">
            <label>Logo URL</label>
            <input type="text" value={settings.logoUrl} onChange={e => handleChange("logoUrl", e.target.value)} />
          </div>
          <div className="form-group">
            <label>Theme</label>
            <select value={settings.theme} onChange={e => handleChange("theme", e.target.value)}>
              {themes.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
            </select>
          </div>
          <div className="form-group">
            <label>Language</label>
            <select value={settings.language} onChange={e => handleChange("language", e.target.value)}>
              {languages.map(l => <option key={l.value} value={l.value}>{l.label}</option>)}
            </select>
          </div>
          <div className="form-group">
            <label>Password Expiry Days</label>
            <input type="number" min={1} value={settings.passwordExpiryDays}
              onChange={e => handleChange("passwordExpiryDays", e.target.value)} />
          </div>
          <div className="form-group checkbox">
            <input type="checkbox" id="twoFA" checked={settings.twoFactorAuth}
              onChange={e => handleChange("twoFactorAuth", e.target.checked)} />
            <label htmlFor="twoFA">Two Factor Auth</label>
          </div>
          <div className="form-group">
            <label>Allowed Login IPs</label>
            <input type="text" value={settings.allowedLoginIPs} onChange={e => handleChange("allowedLoginIPs", e.target.value)} placeholder="CSV or range" />
          </div>
          <div className="form-group">
            <label>Integration Email</label>
            <input type="email" value={settings.integrationEmail} onChange={e => handleChange("integrationEmail", e.target.value)} />
          </div>
          <div className="form-group checkbox">
            <input type="checkbox" id="integrationSMS" checked={settings.integrationSMS}
              onChange={e => handleChange("integrationSMS", e.target.checked)} />
            <label htmlFor="integrationSMS">Integration SMS</label>
          </div>
          <div className="form-group checkbox">
            <input type="checkbox" id="enableAPIAccess" checked={settings.enableAPIAccess}
              onChange={e => handleChange("enableAPIAccess", e.target.checked)} />
            <label htmlFor="enableAPIAccess">Enable API Access</label>
          </div>
          <div className="form-group">
            <label>API Key</label>
            <input type="text" value={settings.apiKey} onChange={e => handleChange("apiKey", e.target.value)} autoComplete="off" />
          </div>
          <div className="form-group">
            <label>Notification Frequency</label>
            <select value={settings.notificationFrequency} onChange={e => handleChange("notificationFrequency", e.target.value)}>
              {notificationFrequencies.map(n => <option key={n.value} value={n.value}>{n.label}</option>)}
            </select>
          </div>
          <div className="form-group checkbox">
            <input type="checkbox" id="backupEnabled" checked={settings.backupEnabled}
              onChange={e => handleChange("backupEnabled", e.target.checked)} />
            <label htmlFor="backupEnabled">Backup Enabled</label>
          </div>
          <div className="form-group">
            <label>Backup Schedule</label>
            <select value={settings.backupSchedule} onChange={e => handleChange("backupSchedule", e.target.value)}>
              {backupSchedules.map(b => <option key={b.value} value={b.value}>{b.label}</option>)}
            </select>
          </div>
          <div className="form-group checkbox">
            <input type="checkbox" id="auditLogging" checked={settings.auditLogging}
              onChange={e => handleChange("auditLogging", e.target.checked)} />
            <label htmlFor="auditLogging">Audit Logging</label>
          </div>
          {error && <div className="error-msg">{error}</div>}
          {success && <div className="success-msg">Settings updated!</div>}
          <button type="submit" className="btn primary">Save Settings</button>
        </form>
        <button className="logout-btn" onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
};

export default Settings;
