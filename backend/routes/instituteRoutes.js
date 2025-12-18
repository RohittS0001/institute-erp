import express from "express";
import {
  getInstituteDashboard,
  getInstituteProfile,
  updateInstituteProfile
} from "../controllers/instituteController.js";

const router = express.Router();

router.get("/dashboard", getInstituteDashboard);
router.get("/profile", getInstituteProfile);
router.put("/profile/update", updateInstituteProfile);

export default router;
 