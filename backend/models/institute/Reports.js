// backend/routes/reportRoutes.js
import express from "express";
import { addReport, getReports } from "../controllers/reportController.js";

const router = express.Router();

router.post("/add", addReport);
router.get("/all", getReports);

export default router;
