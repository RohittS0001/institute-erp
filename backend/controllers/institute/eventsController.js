// backend/controllers/eventController.js

import Event from "../models/Event.js";

// GET ALL EVENTS
export const getAllEvents = async (req, res) => {
  try {
    const events = await Event.findAll({ order: [["id", "DESC"]] });
    res.json(events);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

// CREATE EVENT
export const createEvent = async (req, res) => {
  try {
    const { title, date, location } = req.body;

    const newEvent = await Event.create({ title, date, location });

    res.json(newEvent);
  } catch (error) {
    res.status(500).json({ error: "Unable to create event" });
  }
};
