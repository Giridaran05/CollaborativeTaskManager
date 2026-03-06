const mongoose = require("mongoose")

const workspaceSchema = new mongoose.Schema({

 name:String,

 owner:{
  type:mongoose.Schema.Types.ObjectId,
  ref:"User"
 },

 members:[{
  type:mongoose.Schema.Types.ObjectId,
  ref:"User"
 }],

 inviteCode:String

},{timestamps:true})

module.exports = mongoose.model("Workspace",workspaceSchema)