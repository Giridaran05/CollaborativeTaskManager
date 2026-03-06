const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
 name:String,
 email:{type:String,unique:true},
 password:String,
 role:{
  type:String,
  enum:["Admin","Project Manager","Team Member"],
  default:"Team Member"
 }
},{timestamps:true})

module.exports = mongoose.model("User",userSchema)