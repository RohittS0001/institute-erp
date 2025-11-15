import Donation from "../../models/user/Donation.js";

// GET: all donations
export const getDonations = async (req, res) => {
  try {
    const donations = await Donation.find();
    res.json(donations);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// POST: add donation
export const createDonation = async (req, res) => {
  try {
    const donation = new Donation(req.body);
    await donation.save();
    res.status(201).json(donation);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// GET: donation by ID
export const getDonationById = async (req, res) => {
  try {
    const donation = await Donation.findById(req.params.id);
    if (!donation)
      return res.status(404).json({ error: "Donation not found" });
    res.json(donation);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// PUT: update donation
export const updateDonation = async (req, res) => {
  try {
    const donation = await Donation.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!donation)
      return res.status(404).json({ error: "Donation not found" });
    res.json(donation);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// DELETE: remove donation
export const deleteDonation = async (req, res) => {
  try {
    const donation = await Donation.findByIdAndDelete(req.params.id);
    if (!donation)
      return res.status(404).json({ error: "Donation not found" });
    res.json({ message: "Donation deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
