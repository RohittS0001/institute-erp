import Immersion from "../models/Immersion.js";

export const getImmersions = async (req, res) => {
  try {
    const immersions = await Immersion.find();
    res.json(immersions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createImmersion = async (req, res) => {
  try {
    const newImmersion = new Immersion(req.body);
    await newImmersion.save();
    res.status(201).json(newImmersion);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
