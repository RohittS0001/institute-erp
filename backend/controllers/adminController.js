import { Admin } from "../models/Admin.js";

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
  console.log('Login payload:', JSON.stringify({ email, password }));
  try {
    const admin = await Admin.findOne({ email: { $regex: new RegExp(`^${email}$`, "i") } });
    if (!admin) {
      console.log('Admin not found for:', email);
    } else {
      console.log('Found admin:', admin.email, 'Stored password:', admin.password, 'Input password:', password);
      console.log('Password Equal:', admin.password === password);
    }
    if (!admin || admin.password !== password) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    res.json({ message: "Login successful", admin });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
