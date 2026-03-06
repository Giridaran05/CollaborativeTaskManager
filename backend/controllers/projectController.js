const Project = require("../models/Project");


// Create Project
exports.createProject = async (req, res) => {

  try {

    const { name, description, workspace } = req.body;

    const project = await Project.create({
      name,
      description,
      workspace,
      createdBy: req.user.id
    });

    res.json(project);

  } catch (error) {

    res.status(500).json(error);

  }

};


// Get Projects by Workspace
exports.getProjects = async (req, res) => {

  try {

    const projects = await Project.find({
      workspace: req.params.workspaceId
    });

    res.json(projects);

  } catch (error) {

    res.status(500).json(error);

  }

};


// Delete Project
exports.deleteProject = async (req, res) => {

  try {

    await Project.findByIdAndDelete(req.params.id);

    res.json({ message: "Project deleted" });

  } catch (error) {

    res.status(500).json(error);

  }

};