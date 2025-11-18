import express from "express";
import {
  getAllInstitutes,
  createInstitute,
  updateInstitute,
  deleteInstitute,
} from "../../controllers/admin/institutesController.js";

const router = express.Router();

router.get("/", getAllInstitutes);           // List all institutes
router.post("/", createInstitute);           // Add new institute
router.put("/:id", updateInstitute);         // Update institute by ID
router.delete("/:id", deleteInstitute);      // Delete institute by ID

export default router;
