import express from "express";
import {
  getAllProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject
} from "../controllers/projectsController";
import { protect } from "../middleware/authMiddleware";
import { authorizeRoles } from "../middleware/authorizeRoles";

const router = express.Router();

router.get("/", protect, authorizeRoles( "master"), getAllProjects);
router.get("/:id", protect, getProjectById);
router.post("/", protect, authorizeRoles( "master", "admin"), createProject);
router.put("/:id", protect, authorizeRoles( "master", "admin"), updateProject);
router.delete("/:id", protect, authorizeRoles( "master"), deleteProject);

export default router;
