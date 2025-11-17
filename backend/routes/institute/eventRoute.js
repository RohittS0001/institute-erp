import express from "express";
const router = express.Router();

import {
  addEvent,
  getEvents,
  // updateEvent,
  deleteEvent
} from "../../controllers/institute/eventsController.js"; // Add .js for ESM

router.post("/create", addEvent);
router.get("/all", getEvents);
// router.put("/update/:id", updateEvent);
router.delete("/delete/:id", deleteEvent);

export default router;
