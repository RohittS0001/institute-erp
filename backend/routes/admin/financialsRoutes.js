// backend/routes/admin/financialsRoutes.js
import express from "express";
import { getAllFinancials, createFinancial } from "../../controllers/admin/financialsController.js";
const router = express.Router();

router.get("/", getAllFinancials);    // List all financial records
router.post("/", createFinancial);    // Add new financial record

export default router;
