import express from "express";
import {
  getImmersions,
  createImmersion,
  getImmersionById,
  updateImmersion,
  deleteImmersion
} from "../../controllers/user/immersionController.js";

const router = express.Router();

router.get("/", getImmersions);
router.post("/", createImmersion);

router.get("/:id", getImmersionById);
router.put("/:id", updateImmersion);
router.delete("/:id", deleteImmersion);

export default router;
