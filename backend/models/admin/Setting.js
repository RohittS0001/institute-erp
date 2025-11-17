import mongoose from "mongoose";

const SettingSchema = new mongoose.Schema({
  systemName: String,
  logoUrl: String,
  theme: { type: String, default: "light" },
  language: { type: String, default: "en" },
  passwordExpiryDays: { type: Number, default: 90 },
  twoFactorAuth: { type: Boolean, default: false },
  allowedLoginIPs: String,
  integrationEmail: String,
  integrationSMS: { type: Boolean, default: true },
  enableAPIAccess: { type: Boolean, default: false },
  apiKey: String,
  notificationFrequency: { type: String, default: "daily" },
  backupEnabled: { type: Boolean, default: true },
  backupSchedule: { type: String, default: "weekly" },
  auditLogging: { type: Boolean, default: true },
}, { timestamps: true,
      collection: 'AdminSettings'
 });

export const Setting = mongoose.model("Setting", SettingSchema);
