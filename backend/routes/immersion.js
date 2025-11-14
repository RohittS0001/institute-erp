import express from "express";
import { getImmersions, createImmersion } from "../controllers/immersionController.js";

const router = express.Router();

router.get("/", getImmersions);
router.post("/", createImmersion);

export default router;
