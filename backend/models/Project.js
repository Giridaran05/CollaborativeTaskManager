const mongoose = require("mongoose")

const projectSchema = new mongoose.Schema({

 name:String,

 workspace:{
  type:mongoose.Schema.Types.ObjectId,
  ref:"Workspace"
 }

},{timestamps:true})

module.exports = mongoose.model("Project",projectSchema)