import express from "express";
import {
  getDonations,
  createDonation,
  getDonationById,
  updateDonation,
  deleteDonation
} from "../../controllers/user/donationController.js";

const router = express.Router();

router.get("/", getDonations);
router.post("/", createDonation);

router.get("/:id", getDonationById);
router.put("/:id", updateDonation);
router.delete("/:id", deleteDonation);

export default router;
