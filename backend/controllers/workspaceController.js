const Workspace = require("../models/Workspace");
const Member = require("../models/Member");
const crypto = require("crypto");


// Create Workspace
exports.createWorkspace = async (req, res) => {

  try {

    const { name } = req.body;

    const inviteToken = crypto.randomBytes(20).toString("hex");

    const workspace = await Workspace.create({
      name,
      owner: req.user.id,
      inviteToken
    });

    await Member.create({
      user: req.user.id,
      workspace: workspace._id,
      role: "Admin"
    });

    res.json(workspace);

  } catch (error) {

    res.status(500).json(error);

  }

};



// Join Workspace
exports.joinWorkspace = async (req, res) => {

  try {

    const workspace = await Workspace.findOne({
      inviteToken: req.params.token
    });

    if (!workspace) {
      return res.status(404).json({ message: "Workspace not found" });
    }

    const member = await Member.create({
      user: req.user.id,
      workspace: workspace._id
    });

    res.json(member);

  } catch (error) {

    res.status(500).json(error);

  }

};



// Get Workspaces for user
exports.getWorkspaces = async (req, res) => {

  try {

    const memberships = await Member.find({
      user: req.user.id
    }).populate("workspace");

    res.json(memberships);

  } catch (error) {

    res.status(500).json(error);

  }

};