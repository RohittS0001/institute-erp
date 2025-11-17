// Sample controllers for dashboard widgets

//import Admission from "../../models/user/Admission.js";
import Award from "../../models/user/Award.js";
import Research from "../../models/user/Research.js";
import Immersion from "../../models/user/Immersion.js";
import Placement from "../../models/user/Placement.js";

// Fetch dashboard data for widgets
export const getDashboardData = async (req, res) => {
  try {
    const [admissions, awards, researches, immersions, placements] = await Promise.all([
      Admission.find(),
      Award.find(),
      Research.find(),
      Immersion.find(),
      Placement.find()
    ]);

    res.json({
      admissionsCount: admissions.length,
      awardsCount: awards.length,
      researchesCount: researches.length,
      immersionsPercent: immersions.length > 0 ? 92 : 0,
      placementsCount: placements.length
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Optionally, provide recent activity endpoint
export const getRecentActivity = async (req, res) => {
  res.json([
    { text: "Upcoming Placement Drive", time: "In 1 day" },
    { text: "Membership Expiring Soon", time: "In 2 days" },
    { text: "Attended Research Seminar", time: "Today" },
    { text: "New Notice from Institute", time: "Just now" }
  ]);
};


// import User from "../../models/user/User.js";

// // GET: all users
// export const getUsers = async (req, res) => {
//   try {
//     const users = await User.find();
//     res.json(users);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// // POST: add user
// export const createUser = async (req, res) => {
//   try {
//     const user = new User(req.body);
//     await user.save();
//     res.status(201).json(user);
//   } catch (err) {
//     res.status(400).json({ error: err.message });
//   }
// };

// // GET: user by ID
// export const getUserById = async (req, res) => {
//   try {
//     const user = await User.findById(req.params.id);
//     if (!user)
//       return res.status(404).json({ error: "User not found" });
//     res.json(user);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// // PUT: update user
// export const updateUser = async (req, res) => {
//   try {
//     const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
//     if (!user)
//       return res.status(404).json({ error: "User not found" });
//     res.json(user);
//   } catch (err) {
//     res.status(400).json({ error: err.message });
//   }
// };

// // DELETE: remove user
// export const deleteUser = async (req, res) => {
//   try {
//     const user = await User.findByIdAndDelete(req.params.id);
//     if (!user)
//       return res.status(404).json({ error: "User not found" });
//     res.json({ message: "User deleted" });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };
