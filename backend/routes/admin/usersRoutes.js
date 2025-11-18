import express from "express";
import {
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
} from "../../controllers/admin/usersController.js";

const router = express.Router();

router.get("/", getAllUsers);           // List users
router.post("/", createUser);           // Add new user
router.put("/:id", updateUser);         // Update user by ID
router.delete("/:id", deleteUser);      // Delete user by ID

export default router;
