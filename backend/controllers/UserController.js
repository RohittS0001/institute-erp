import User from "../../models/user/User.js";

// Register new user
export const registerUser = async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all users
export const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// User login
export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  console.log('Login payload:', JSON.stringify({ email, password }));
  try {
    const user = await User.findOne({ email: { $regex: new RegExp(`^${email}$`, "i") } });
    if (!user) {
      console.log('User not found for:', email);
    } else {
      console.log('Found user:', user.email, 'Stored password:', user.password, 'Input password:', password);
      console.log('Password Equal:', user.password === password);
    }
    if (!user || user.password !== password) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    res.json({ message: "Login successful", user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
