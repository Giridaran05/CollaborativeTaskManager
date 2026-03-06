const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
  createWorkspace,
  joinWorkspace,
  getWorkspaces
} = require("../controllers/workspaceController");


router.post("/", authMiddleware, createWorkspace);

router.get("/", authMiddleware, getWorkspaces);

router.post("/join/:token", authMiddleware, joinWorkspace);


module.exports = router;