const mongoose = require("mongoose");

const memberSchema = new mongoose.Schema({

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },

  workspace: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Workspace"
  },

  role: {
    type: String,
    enum: ["Admin", "Project Manager", "Team Member"],
    default: "Team Member"
  }

});

module.exports = mongoose.model("Member", memberSchema);