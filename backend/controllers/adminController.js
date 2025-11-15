import { Admin } from "../models/adminmodels.js"; // Ensure correct filename!

// Register new admin
export const registerAdmin = async (req, res) => {
  try {
    const admin = new Admin(req.body);
    await admin.save();
    res.status(201).json(admin);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all admins
export const getAdmins = async (req, res) => {
  try {
    const admins = await Admin.find();
    res.json(admins);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Admin login
export const loginAdmin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const admin = await Admin.findOne({ email: { $regex: new RegExp(`^${email}$`, "i") } });
    if (!admin || admin.password !== password) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    res.json({ message: "Login successful", admin });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
