// backend/controllers/institute/profileController.js

import Profile from "../../models/institute/Profile.js";  // ✅ CORRECT PATH

// GET profile (used by GET /api/institute/profile/me)
export const getProfile = async (req, res) => {
  try {
    // We keep only one profile row
    let profile = await Profile.findOne();

    // If no profile exists yet, create a blank one
    if (!profile) {
      profile = await Profile.create({
        instituteName: "",
        adminName: "",
        email: "",
        phone: "",
        address: "",
      });
    }

    return res.json(profile);
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

// UPDATE profile (used by PUT /api/institute/profile/update)
export const updateProfile = async (req, res) => {
  try {
    let profile = await Profile.findOne();

    if (!profile) {
      profile = await Profile.create(req.body);
    } else {
      await profile.update(req.body);
    }

    return res.json({ success: true, profile });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};
