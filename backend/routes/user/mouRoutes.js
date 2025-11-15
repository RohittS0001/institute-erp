import express from "express";
import {
  getMOUs,
  createMOU,
  getMOUById,
  updateMOU,
  deleteMOU
} from "../../controllers/user/mouController.js";

const router = express.Router();

router.get("/", getMOUs);
router.post("/", createMOU);

router.get("/:id", getMOUById);
router.put("/:id", updateMOU);
router.delete("/:id", deleteMOU);

export default router;
