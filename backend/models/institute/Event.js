import { pool } from "../../config/db.js";

// GET all events
export const getEvents = async () => {
  const [rows] = await pool.query("SELECT * FROM events ORDER BY id DESC");
  return rows;
};

// ADD event
export const addEvent = async (data) => {
  const [result] = await pool.query(
    "INSERT INTO events (title, description, date, venue) VALUES (?, ?, ?, ?)",
    [data.title, data.description, data.date, data.venue]
  );
  return result.insertId;
};

// UPDATE event
export const updateEvent = async (id, data) => {
  await pool.query(
    "UPDATE events SET title=?, description=?, date=?, venue=? WHERE id=?",
    [data.title, data.description, data.date, data.venue, id]
  );
  return true;
};

// DELETE event
export const deleteEvent = async (id) => {
  await pool.query("DELETE FROM events WHERE id=?", [id]);
  return true;
};

// COUNT events (for dashboard)
export const countEvents = async () => {
  const [rows] = await pool.query("SELECT COUNT(*) AS total FROM events");
  return rows[0].total;
};
 