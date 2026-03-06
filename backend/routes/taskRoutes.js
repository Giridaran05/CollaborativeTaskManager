const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
  addComment
} = require("../controllers/taskController");


router.post("/", authMiddleware, createTask);

router.get("/:projectId", authMiddleware, getTasks);

router.patch("/:id", authMiddleware, updateTask);

router.delete("/:id", authMiddleware, deleteTask);

router.post("/:id/comment", authMiddleware, addComment);


module.exports = router;