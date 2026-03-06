const express = require("express");
const router = express.Router();
const Workspace = require("../models/Workspace");

// Create workspace
router.post("/", async (req, res) => {
  try {

    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Workspace name required" });
    }

    const workspace = new Workspace({ name });

    await workspace.save();

    res.status(201).json(workspace);

  } catch (error) {
    res.status(500).json({ message: "Failed to create workspace" });
  }
});

// Get all workspaces
router.get("/", async (req, res) => {

  const workspaces = await Workspace.find().sort({ createdAt: -1 });

  res.json(workspaces);

});

module.exports = router;