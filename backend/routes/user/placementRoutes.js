import express from "express";
import {
  getPlacements,
  createPlacement,
  getPlacementById,
  updatePlacement,
  deletePlacement
} from "../../controllers/user/placementController.js";

const router = express.Router();

router.get("/", getPlacements);
router.post("/", createPlacement);

router.get("/:id", getPlacementById);
router.put("/:id", updatePlacement);
router.delete("/:id", deletePlacement);

export default router;
