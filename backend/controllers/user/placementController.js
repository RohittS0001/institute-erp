import Placement from "../../models/user/Placement.js";

// GET: all placements
export const getPlacements = async (req, res) => {
  try {
    const placements = await Placement.find();
    res.json(placements);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// POST: add new placement
export const createPlacement = async (req, res) => {
  try {
    const placement = new Placement(req.body);
    await placement.save();
    res.status(201).json(placement);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// GET: placement by ID
export const getPlacementById = async (req, res) => {
  try {
    const placement = await Placement.findById(req.params.id);
    if (!placement)
      return res.status(404).json({ error: "Placement not found" });
    res.json(placement);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// PUT: update placement
export const updatePlacement = async (req, res) => {
  try {
    const placement = await Placement.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!placement)
      return res.status(404).json({ error: "Placement not found" });
    res.json(placement);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// DELETE: remove placement
export const deletePlacement = async (req, res) => {
  try {
    const placement = await Placement.findByIdAndDelete(req.params.id);
    if (!placement)
      return res.status(404).json({ error: "Placement not found" });
    res.json({ message: "Placement deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
