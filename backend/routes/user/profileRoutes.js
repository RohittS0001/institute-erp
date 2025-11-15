import express from "express";
import {
  getProfiles,
  createProfile,
  getProfileById,
  updateProfile,
  deleteProfile
} from "../../controllers/user/profileController.js";

const router = express.Router();

router.get("/", getProfiles);
router.post("/", createProfile);

router.get("/:id", getProfileById);
router.put("/:id", updateProfile);
router.delete("/:id", deleteProfile);

export default router;
