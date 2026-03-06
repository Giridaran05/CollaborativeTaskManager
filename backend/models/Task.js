const mongoose = require("mongoose")

const taskSchema = new mongoose.Schema({

 title:String,
 description:String,

 priority:{
  type:String,
  enum:["Low","Medium","High"],
  default:"Medium"
 },

 deadline:Date,

 status:{
  type:String,
  enum:["To Do","In Progress","Review","Done"],
  default:"To Do"
 },

 project:{
  type:mongoose.Schema.Types.ObjectId,
  ref:"Project"
 },

 assignedUsers:[{
  type:mongoose.Schema.Types.ObjectId,
  ref:"User"
 }],

 attachments:[String],

 comments:[
  {
   user:String,
   message:String,
   createdAt:{type:Date,default:Date.now}
  }
 ]

},{timestamps:true})

module.exports = mongoose.model("Task",taskSchema)