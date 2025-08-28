import express from "express";
import {
  getAllUsers,
  getAvailableRoles,
  updateUser,
  deleteUser,
} from "../controllers/userController";
import { protect } from "../middleware/authMiddleware";
import { authorizeRoles } from "../middleware/authorizeRoles";

const router = express.Router();

router.get("/users", protect, getAllUsers);
router.get("/roles", protect, authorizeRoles("admin", "master"), getAvailableRoles);
router.put("/users/:id", protect, authorizeRoles("admin", "master"), updateUser);
router.delete("/users/:id", protect, authorizeRoles("admin", "master"), deleteUser);

export default router;
