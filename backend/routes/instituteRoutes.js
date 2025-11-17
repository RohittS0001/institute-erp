import express from "express";
import { registerInstitute, getInstitutes, loginInstitute } from "../controllers/adminController.js";

const router = express.Router();
router.post("/register", registerInstitute);
router.get("/", getInstitutes);
router.post("/login", loginInstitute);

export default router;
