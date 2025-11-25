// backend/routes/eventRoutes.js

import express from "express";
import { getAllEvents, createEvent } from "../controllers/eventController.js";

const router = express.Router();

// GET all events
router.get("/all", getAllEvents);

// CREATE event
router.post("/create", createEvent);

export default router;
 