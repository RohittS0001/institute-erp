import Immersion from "../../models/user/Immersion.js";

// GET: all immersion records
export const getImmersions = async (req, res) => {
  try {
    const immersions = await Immersion.find();
    res.json(immersions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// POST: add immersion record
export const createImmersion = async (req, res) => {
  try {
    const immersion = new Immersion(req.body);
    await immersion.save();
    res.status(201).json(immersion);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// GET: immersion by ID
export const getImmersionById = async (req, res) => {
  try {
    const immersion = await Immersion.findById(req.params.id);
    if (!immersion)
      return res.status(404).json({ error: "Immersion not found" });
    res.json(immersion);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// PUT: update immersion
export const updateImmersion = async (req, res) => {
  try {
    const immersion = await Immersion.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!immersion)
      return res.status(404).json({ error: "Immersion not found" });
    res.json(immersion);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// DELETE: remove immersion
export const deleteImmersion = async (req, res) => {
  try {
    const immersion = await Immersion.findByIdAndDelete(req.params.id);
    if (!immersion)
      return res.status(404).json({ error: "Immersion not found" });
    res.json({ message: "Immersion deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
