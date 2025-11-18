import User from "../../models/admin/User.js";
import Course from "../../models/admin/Course.js";
import Notification from "../../models/admin/Notification.js";
import Financial from "../../models/admin/Financial.js";
import Institute from "../../models/admin/Institute.js"; // import the Institute model

export const getDashboardData = async (req, res) => {
  try {
    const usersCount = await User.countDocuments();
    const coursesCount = await Course.countDocuments();
    const notificationsCount = await Notification.countDocuments({ status: "Active" });
    const financialSum = await Financial.aggregate([
      { $group: { _id: null, totalAmount: { $sum: "$amount" } } },
    ]);
    const institutes = await Institute.find(); // fetch all institute details

    res.json({
      usersCount,
      coursesCount,
      notificationsCount,
      financialSum: financialSum[0]?.totalAmount || 0,
      institutes, // include full institute array in the response
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch dashboard data" });
  }
};
