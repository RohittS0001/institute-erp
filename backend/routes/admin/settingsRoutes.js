import express from "express";
import { getSettings, saveSettings } from "../../controllers/admin/settingsController.js";
const router = express.Router();

router.get("/", getSettings);
router.post("/", saveSettings);

export default router;
