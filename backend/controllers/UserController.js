import User from "../../models/usermodels.js";

// Register new user
export const registerUser = async (req, res) => {
  try {
    const user = new User(req.body); // Here it creates a new user doc
    await user.save();               // Here it saves (and possibly creates) the collection
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

  console.log('Login attempt:', { email });

  try {
    const user = await User.findOne({ email: { $regex: new RegExp(`^${email}$`, "i") } });
    
    if (!user) {
      console.log('User not found:', email);
      return res.status(401).json({ error: "Invalid credentials" });
    }

    if (user.password !== password) {
      console.log('Password mismatch for:', email);
      return res.status(401).json({ error: "Invalid credentials" });
    }

    console.log('User login successful:', email);
    res.json({ message: "Login successful", user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};
