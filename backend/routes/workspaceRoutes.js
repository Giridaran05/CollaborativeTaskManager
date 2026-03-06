const express = require("express");
const router = express.Router();
const Workspace = require("../models/Workspace");

// CREATE WORKSPACE
router.post("/", async (req, res) => {
  try {

    const { name } = req.body;

    const workspace = new Workspace({
      name
    });

    await workspace.save();

    res.status(201).json(workspace);

  } catch (error) {
    res.status(500).json({ message: "Workspace creation failed" });
  }
});

// GET ALL WORKSPACES
router.get("/", async (req, res) => {

  const workspaces = await Workspace.find();

  res.json(workspaces);

});

module.exports = router;