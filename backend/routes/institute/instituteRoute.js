import express from "express";
const router = express.Router();

import {
  getInstituteInfo,
  updateInstituteInfo
} from "../../controllers/institute/instituteController.js"; // Add .js for ESM

router.get("/info", getInstituteInfo);
router.put("/update", updateInstituteInfo);

export default router;
