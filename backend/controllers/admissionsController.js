import Admissions from "../models/Admissions.js";

export const getAdmissions = async (req, res) => {
  try {
    const admissions = await Admissions.find();
    res.json(admissions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createAdmission = async (req, res) => {
  try {
    const newAdmission = new Admissions(req.body);
    await newAdmission.save();
    res.status(201).json(newAdmission);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
