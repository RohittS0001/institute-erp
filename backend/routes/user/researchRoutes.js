import express from "express";
import {
  getResearches,
  createResearch,
  getResearchById,
  updateResearch,
  deleteResearch
} from "../../controllers/user/researchController.js";

const router = express.Router();

router.get("/", getResearches);
router.post("/", createResearch);

router.get("/:id", getResearchById);
router.put("/:id", updateResearch);
router.delete("/:id", deleteResearch);

export default router;
