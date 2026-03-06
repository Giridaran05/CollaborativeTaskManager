const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
  createProject,
  getProjects,
  deleteProject
} = require("../controllers/projectController");


router.post("/", authMiddleware, createProject);

router.get("/:workspaceId", authMiddleware, getProjects);

router.delete("/:id", authMiddleware, deleteProject);


module.exports = router;