import express from "express";
import {
  getAllFinancials,
  createFinancial,
  updateFinancial,
  deleteFinancial,
} from "../../controllers/admin/financialsController.js";

const router = express.Router();

router.get("/", getAllFinancials);             // List all financial records
router.post("/", createFinancial);             // Add new financial record
router.put("/:id", updateFinancial);           // Update financial record by ID
router.delete("/:id", deleteFinancial);        // Delete financial record by ID

export default router;
