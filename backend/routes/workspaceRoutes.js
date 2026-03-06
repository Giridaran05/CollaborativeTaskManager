const express = require("express")
const router = express.Router()
const Workspace = require("../models/Workspace")
const crypto = require("crypto")

router.post("/",async(req,res)=>{

 const inviteCode = crypto.randomBytes(4).toString("hex")

 const workspace = new Workspace({
  name:req.body.name,
  inviteCode
 })

 await workspace.save()

 res.json(workspace)

})

router.get("/",async(req,res)=>{

 const workspaces = await Workspace.find()

 res.json(workspaces)

})

router.get("/join/:code",async(req,res)=>{

 const workspace = await Workspace.findOne({
  inviteCode:req.params.code
 })

 if(!workspace) return res.status(404).json("Invalid code")

 workspace.members.push(req.user)

 await workspace.save()

 res.json(workspace)

})

module.exports = router