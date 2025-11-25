import {
  createProfile,
  getProfiles,
  findProfileById,
  updateProfile,
  deleteProfile
} from "../../models/user/Profile.js";

// GET: all profiles
export const getProfilesHandler = (req, res) => {
  getProfiles((err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

// POST: add profile
export const createProfileHandler = (req, res) => {
  createProfile(req.body, (err, result) => {
    if (err) return res.status(400).json({ error: err.message });
    res.status(201).json({ id: result.insertId, ...req.body });
  });
};

// GET: profile by ID
export const getProfileByIdHandler = (req, res) => {
  findProfileById(req.params.id, (err, profile) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!profile) return res.status(404).json({ error: "Profile not found" });
    res.json(profile);
  });
};

// PUT: update profile
export const updateProfileHandler = (req, res) => {
  updateProfile(req.params.id, req.body, (err, result) => {
    if (err) return res.status(400).json({ error: err.message });
    if (result.affectedRows === 0)
      return res.status(404).json({ error: "Profile not found" });
    res.json({ id: req.params.id, ...req.body });
  });
};

// DELETE: remove profile
export const deleteProfileHandler = (req, res) => {
  deleteProfile(req.params.id, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (result.affectedRows === 0)
      return res.status(404).json({ error: "Profile not found" });
    res.json({ message: "Profile deleted" });
  });
};
