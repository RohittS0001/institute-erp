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
        const response = await axios.get("http://localhost:4000/api/settings");
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
      await axios.post("http://localhost:4000/api/settings", settings);
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
        {/* Your existing form UI unchanged, just replacing onChange handlers */}
        <fieldset>
          <legend>General</legend>
          <label>
            System Name:
            <input
              type="text"
              value={settings.systemName}
              onChange={e => handleChange("systemName", e.target.value)}
              required
            />
          </label>
          <label>
            Logo URL:
            <input
              type="text"
              value={settings.logoUrl}
              placeholder="https://example.com/logo.png"
              onChange={e => handleChange("logoUrl", e.target.value)}
            />
          </label>
          <label>
            Theme:
            <select
              value={settings.theme}
              onChange={e => handleChange("theme", e.target.value)}
            >
              {themes.map(theme => (
                <option key={theme.value} value={theme.value}>{theme.label}</option>
              ))}
            </select>
          </label>
          <label>
            Language:
            <select
              value={settings.language}
              onChange={e => handleChange("language", e.target.value)}
            >
              {languages.map(lang => (
                <option key={lang.value} value={lang.value}>{lang.label}</option>
              ))}
            </select>
          </label>
        </fieldset>

        <fieldset>
          <legend>Security</legend>
          <label>
            Password Expiry (Days):
            <input
              type="number"
              value={settings.passwordExpiryDays}
              min={1}
              max={365}
              onChange={e => handleChange("passwordExpiryDays", Number(e.target.value))}
              required
            />
          </label>
          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={settings.twoFactorAuth}
              onChange={e => handleChange("twoFactorAuth", e.target.checked)}
            />
            Enable Two Factor Authentication (2FA)
          </label>
          <label>
            Allowed Login IPs (comma separated):
            <input
              type="text"
              value={settings.allowedLoginIPs}
              onChange={e => handleChange("allowedLoginIPs", e.target.value)}
              placeholder="e.g. 192.168.0.1, 10.0.0.2"
            />
          </label>
        </fieldset>

        <fieldset>
          <legend>Integrations & API</legend>
          <label>
            Support Email:
            <input
              type="email"
              value={settings.integrationEmail}
              onChange={e => handleChange("integrationEmail", e.target.value)}
              required
            />
          </label>
          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={settings.integrationSMS}
              onChange={e => handleChange("integrationSMS", e.target.checked)}
            />
            Enable SMS Notifications
          </label>
          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={settings.enableAPIAccess}
              onChange={e => handleChange("enableAPIAccess", e.target.checked)}
            />
            Enable API Access
          </label>
          {settings.enableAPIAccess && (
            <label>
              API Key:
              <input
                type="text"
                value={settings.apiKey}
                onChange={e => handleChange("apiKey", e.target.value)}
                placeholder="Auto-generated or custom API key"
              />
            </label>
          )}
        </fieldset>

        <fieldset>
          <legend>Notifications & Maintenance</legend>
          <label>
            Notification Frequency:
            <select
              value={settings.notificationFrequency}
              onChange={e => handleChange("notificationFrequency", e.target.value)}
            >
              {notificationFrequencies.map(freq => (
                <option key={freq.value} value={freq.value}>{freq.label}</option>
              ))}
            </select>
          </label>
          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={settings.backupEnabled}
              onChange={e => handleChange("backupEnabled", e.target.checked)}
            />
            Enable System Backups
          </label>
          {settings.backupEnabled && (
            <label>
              Backup Schedule:
              <select
                value={settings.backupSchedule}
                onChange={e => handleChange("backupSchedule", e.target.value)}
              >
                {backupSchedules.map(opt => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </label>
          )}
          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={settings.auditLogging}
              onChange={e => handleChange("auditLogging", e.target.checked)}
            />
            Enable Audit Logging
          </label>
        </fieldset>

        <button type="submit" className="save-btn">
          Save Settings
        </button>
      </form>
    </div>
  );
};

export default Settings;
