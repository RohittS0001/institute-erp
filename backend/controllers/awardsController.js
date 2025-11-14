import Awards from "../models/Awards.js";

export const getAwards = async (req, res) => {
  try {
    const awards = await Awards.find();
    res.json(awards);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createAward = async (req, res) => {
  try {
    const newAward = new Awards(req.body);
    await newAward.save();
    res.status(201).json(newAward);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
