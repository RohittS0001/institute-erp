import Institute from "../../models/institute/institute.js";

export const getInstituteInfo = async (req, res) => {
  try {
    const data = await Institute.findOne();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateInstituteInfo = async (req, res) => {
  try {
    const updated = await Institute.findOneAndUpdate({}, req.body, {
      new: true,
      upsert: true,
    });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
