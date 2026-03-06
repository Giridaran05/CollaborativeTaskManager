const express = require("express")
const router = express.Router()
const Task = require("../models/Task")

router.post("/",async(req,res)=>{

 const task = new Task(req.body)

 await task.save()

 res.json(task)

})

router.get("/project/:id",async(req,res)=>{

 const tasks = await Task.find({project:req.params.id})

 res.json(tasks)

})

router.patch("/:id",async(req,res)=>{

 const task = await Task.findByIdAndUpdate(
  req.params.id,
  req.body,
  {new:true}
 )

 res.json(task)

})

module.exports = router