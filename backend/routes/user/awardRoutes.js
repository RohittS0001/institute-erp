import express from "express";
import {
  getAwards,
  createAward,
  getAwardById,
  updateAward,
  deleteAward
} from "../../controllers/user/awardController.js";

const router = express.Router();

router.get("/", getAwards);
router.post("/", createAward);

router.get("/:id", getAwardById);
router.put("/:id", updateAward);
router.delete("/:id", deleteAward);

export default router;
