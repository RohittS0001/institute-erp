import express from "express";
const router = express.Router();

import {
  // dashboardSummary,
  getDashboardStats
} from "../../controllers/institute/dashboardController.js"; 

// router.get("/summary", dashboardSummary);
router.get("/dashboard-stats", getDashboardStats)


export default router;
