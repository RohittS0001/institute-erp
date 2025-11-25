import Profile from "../models/Profile.js";

export const getProfile = async (req, res) => {
  try {
    const profile = await Profile.findOne();
    res.json(profile);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateProfile = async (req, res) => {
  try {
    let profile = await Profile.findOne();
    if (!profile) {
      profile = await Profile.create(req.body);
    } else {
      await profile.update(req.body);
    }
    res.json({ success: true, profile });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
