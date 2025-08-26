import { Router } from "express";
import { getAllUsers, getAvailableRoles, updateUser } from "../controllers/userController";

const router = Router();

router.get("/users", getAllUsers);
router.get("/roles", getAvailableRoles);
router.put("/users/:id", updateUser);

export default router;
