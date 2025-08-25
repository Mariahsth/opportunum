import { Router } from "express";
import { getMe, login, register } from "../controllers/authController";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.get('/me', getMe);

export default router;
