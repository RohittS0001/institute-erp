import express from "express";
import { getAwards, createAward } from "../controllers/awardsController.js";

const router = express.Router();

router.get("/", getAwards);
router.post("/", createAward);

export default router;
