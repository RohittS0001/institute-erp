import Membership from "../../models/user/Membership.js";

// GET: all memberships
export const getMemberships = async (req, res) => {
  try {
    const memberships = await Membership.find().populate("userId", "name email");
    res.json(memberships);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// POST: add membership
export const createMembership = async (req, res) => {
  try {
    const membership = new Membership(req.body);
    await membership.save();
    res.status(201).json(membership);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// GET: membership by ID
export const getMembershipById = async (req, res) => {
  try {
    const membership = await Membership.findById(req.params.id).populate("userId", "name email");
    if (!membership)
      return res.status(404).json({ error: "Membership not found" });
    res.json(membership);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// PUT: update membership
export const updateMembership = async (req, res) => {
  try {
    const membership = await Membership.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!membership)
      return res.status(404).json({ error: "Membership not found" });
    res.json(membership);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// DELETE: remove membership
export const deleteMembership = async (req, res) => {
  try {
    const membership = await Membership.findByIdAndDelete(req.params.id);
    if (!membership)
      return res.status(404).json({ error: "Membership not found" });
    res.json({ message: "Membership deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
