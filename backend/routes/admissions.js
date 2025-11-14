import express from "express";
import { getAdmissions, createAdmission } from "../controllers/admissionsController.js";

const router = express.Router();

router.get("/", getAdmissions);
router.post("/", createAdmission);
// add other CRUD routes as needed

export default router;
