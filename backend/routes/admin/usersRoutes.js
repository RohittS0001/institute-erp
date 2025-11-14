// backend/routes/admin/usersRoutes.js
import express from "express";
import { getAllUsers, createUser } from "../../controllers/admin/usersController.js";
const router = express.Router();

router.get("/", getAllUsers);       // List users
router.post("/", createUser);       // Add user

export default router;
