import express from "express";
import {
  getAllFinancialsHandler,
  createFinancialHandler,
  updateFinancialHandler,
  deleteFinancialHandler,
} from "../../controllers/admin/financialsController.js";

const router = express.Router();

router.get("/", getAllFinancialsHandler);          // List all financial records
router.post("/", createFinancialHandler);          // Add new financial record
router.put("/:id", updateFinancialHandler);        // Update financial record by ID
router.delete("/:id", deleteFinancialHandler);     // Delete financial record by ID

export default router;
