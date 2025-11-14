import Research from "../models/Research.js";

export const getResearches = async (req, res) => {
  try {
    const researches = await Research.find();
    res.json(researches);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createResearch = async (req, res) => {
  try {
    const newResearch = new Research(req.body);
    await newResearch.save();
    res.status(201).json(newResearch);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
