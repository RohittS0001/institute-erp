import express from "express";
const router = express.Router();

import {
  getProfile,
  updateProfile
} from "../../controllers/institute/profileController.js"; // Add .js for ESM

router.get("/:id", getProfile);
router.put("/update/:id", updateProfile);

export default router;
