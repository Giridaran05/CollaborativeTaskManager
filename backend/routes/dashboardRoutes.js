const express = require("express")
const router = express.Router()
const Task = require("../models/Task")

router.get("/",async(req,res)=>{

 const totalTasks = await Task.countDocuments()

 const completed = await Task.countDocuments({status:"Done"})

 const inProgress = await Task.countDocuments({status:"In Progress"})

 const todo = await Task.countDocuments({status:"To Do"})

 res.json({
  totalTasks,
  completed,
  inProgress,
  todo
 })

})

module.exports = router