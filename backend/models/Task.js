const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  text: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const taskSchema = new mongoose.Schema(
{
  title: {
    type: String,
    required: true
  },

  description: {
    type: String
  },

  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Project"
  },

  assignedUsers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  ],

  priority: {
    type: String,
    enum: ["Low", "Medium", "High"],
    default: "Medium"
  },

  deadline: Date,

  status: {
    type: String,
    enum: ["todo", "inprogress", "review", "done"],
    default: "todo"
  },

  attachments: [String],

  comments: [commentSchema]

},
{ timestamps: true }
);

module.exports = mongoose.model("Task", taskSchema);