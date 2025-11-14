// backend/routes/admin/notificationsRoutes.js
import express from "express";
import { getAllNotifications, createNotification } from "../../controllers/admin/notificationsController.js";
const router = express.Router();

router.get("/", getAllNotifications);        // List notifications
router.post("/", createNotification);        // Add notification

export default router;
