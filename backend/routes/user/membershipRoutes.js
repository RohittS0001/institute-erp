import express from "express";
import {
  getMemberships,
  createMembership,
  getMembershipById,
  updateMembership,
  deleteMembership
} from "../../controllers/user/membershipController.js";

const router = express.Router();

router.get("/", getMemberships);
router.post("/", createMembership);

router.get("/:id", getMembershipById);
router.put("/:id", updateMembership);
router.delete("/:id", deleteMembership);

export default router;
