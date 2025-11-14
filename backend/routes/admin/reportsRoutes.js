// backend/routes/admin/reportsRoutes.js
import express from "express";
import { getAllReports, createReport } from "../../controllers/admin/reportsController.js";
const router = express.Router();

router.get("/", getAllReports);         // List reports
router.post("/", createReport);         // Add report

export default router;
