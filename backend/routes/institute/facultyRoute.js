import express from "express";
const router = express.Router();

import {
  addFaculty,
  getFaculty,
  updateFaculty,
  deleteFaculty
} from "../../controllers/institute/facultyController.js"; // .js required for ESM

router.post("/add", addFaculty);
router.get("/all", getFaculty);
router.put("/update/:id", updateFaculty);
router.delete("/delete/:id", deleteFaculty);

export default router;
