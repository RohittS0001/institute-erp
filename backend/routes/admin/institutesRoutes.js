// backend/routes/admin/institutesRoutes.js
import express from "express";
import { getAllInstitutes, createInstitute } from "../../controllers/admin/institutesController.js";
const router = express.Router();

router.get("/", getAllInstitutes);      // List all institutes
router.post("/", createInstitute);      // Add a new institute

export default router;
