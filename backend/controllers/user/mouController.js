import MOU from "../../models/user/MOU.js";

// GET: all MOUs
export const getMOUs = async (req, res) => {
  try {
    const mous = await MOU.find();
    res.json(mous);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// POST: add MOU
export const createMOU = async (req, res) => {
  try {
    const mou = new MOU(req.body);
    await mou.save();
    res.status(201).json(mou);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// GET: MOU by ID
export const getMOUById = async (req, res) => {
  try {
    const mou = await MOU.findById(req.params.id);
    if (!mou)
      return res.status(404).json({ error: "MOU not found" });
    res.json(mou);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// PUT: update MOU
export const updateMOU = async (req, res) => {
  try {
    const mou = await MOU.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!mou)
      return res.status(404).json({ error: "MOU not found" });
    res.json(mou);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// DELETE: remove MOU
export const deleteMOU = async (req, res) => {
  try {
    const mou = await MOU.findByIdAndDelete(req.params.id);
    if (!mou)
      return res.status(404).json({ error: "MOU not found" });
    res.json({ message: "MOU deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
