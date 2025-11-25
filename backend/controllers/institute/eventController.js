export const addEvent = async (req, res) => {
  res.json({ message: "Event added!" });
};

export const getEvents = async (req, res) => {
  res.json({ message: "All events" });
};

export const updateEvent = async (req, res) => {
  res.json({ message: "Event updated!" });
};

export const deleteEvent = async (req, res) => {
  res.json({ message: "Event deleted!" });
};
