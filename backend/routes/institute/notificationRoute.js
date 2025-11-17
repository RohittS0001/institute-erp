import express from "express";
const router = express.Router();

import {
  getNotifications,
  // markAsRead,
  addNotification
} from "../../controllers/institute/notificationsController.js"; // .js required

router.post("/send", addNotification);
router.get("/all", getNotifications);
// router.put("/read/:id", markAsRead);

export default router;
