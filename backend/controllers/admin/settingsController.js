import { Setting } from "../../models/admin/Setting.js";

export const getSettings = async (req, res) => {
  try {
    let settings = await Setting.findOne();
    if (!settings) {
      settings = new Setting(); // Defaults
      await settings.save();
    }
    res.json(settings);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch settings" });
  }
};

export const saveSettings = async (req, res) => {
  try {
    let settings = await Setting.findOne();
    if (!settings) {
      settings = new Setting(req.body);
    } else {
      Object.assign(settings, req.body); // Update fields
    }
    await settings.save();
    res.json(settings);
  } catch (err) {
    res.status(500).json({ error: "Failed to save settings" });
  }
};
