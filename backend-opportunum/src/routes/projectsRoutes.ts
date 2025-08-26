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
router.post("/", protect, authorizeRoles( "master"), createProject);
router.put("/:id", protect, updateProject);
router.delete("/:id", protect, deleteProject);

export default router;
