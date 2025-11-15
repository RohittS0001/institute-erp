import Award from "../../models/user/Award.js";

// GET: all awards
export const getAwards = async (req, res) => {
  try {
    const awards = await Award.find();
    res.json(awards);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// POST: add award
export const createAward = async (req, res) => {
  try {
    const award = new Award(req.body);
    await award.save();
    res.status(201).json(award);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// GET: award by ID
export const getAwardById = async (req, res) => {
  try {
    const award = await Award.findById(req.params.id);
    if (!award)
      return res.status(404).json({ error: "Award not found" });
    res.json(award);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// PUT: update award
export const updateAward = async (req, res) => {
  try {
    const award = await Award.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!award)
      return res.status(404).json({ error: "Award not found" });
    res.json(award);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// DELETE: remove award
export const deleteAward = async (req, res) => {
  try {
    const award = await Award.findByIdAndDelete(req.params.id);
    if (!award)
      return res.status(404).json({ error: "Award not found" });
    res.json({ message: "Award deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
