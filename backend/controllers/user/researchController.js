import Research from "../../models/user/Research.js";

// GET: all researches
export const getResearches = async (req, res) => {
  try {
    const researches = await Research.find();
    res.json(researches);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// POST: add research
export const createResearch = async (req, res) => {
  try {
    const research = new Research(req.body);
    await research.save();
    res.status(201).json(research);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// GET: research by ID
export const getResearchById = async (req, res) => {
  try {
    const research = await Research.findById(req.params.id);
    if (!research)
      return res.status(404).json({ error: "Research not found" });
    res.json(research);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// PUT: update research
export const updateResearch = async (req, res) => {
  try {
    const research = await Research.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!research)
      return res.status(404).json({ error: "Research not found" });
    res.json(research);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// DELETE: remove research
export const deleteResearch = async (req, res) => {
  try {
    const research = await Research.findByIdAndDelete(req.params.id);
    if (!research)
      return res.status(404).json({ error: "Research not found" });
    res.json({ message: "Research deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
