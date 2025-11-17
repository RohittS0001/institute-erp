
import { InstituteRecord } from "../models/institutemodels.js";

// Register new institute
export const registerInstitute = async (req, res) => {
  try {
    const institute = new InstituteRecord(req.body);
    await institute.save();
    res.status(201).json(institute);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all institutes
export const getInstitutes = async (req, res) => {
  try {
    const data = await InstituteRecord.find();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// institute login
export const loginInstitute = async (req, res) => {
  const { email, password } = req.body;
  try {
    const institute = await InstituteRecord.findOne({ email: { $regex: new RegExp(`^${email}$`, "i") } });
    if (!institute || institute.password !== password) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    res.json({ message: "Login successful", institute});
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
