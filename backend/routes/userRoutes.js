// routes/userRoutes.js
import express from "express";
import {
  registerUser,
  getUsers,
  loginUser,
} from "../controllers/userController.js";

const router = express.Router();

// Register new user
router.post("/register", registerUser);

// Get all users
router.get("/", getUsers);

// User login
router.post("/login", loginUser);

export default router;


// import express from "express";
// import { registerUser, getUsers, loginUser } from "../controllers/userController.js";

// const router = express.Router();

// router.post("/register", registerUser);
// router.get("/", getUsers);
// router.post("/login", loginUser);

// export default router;
