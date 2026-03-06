const express = require("express")
const router = express.Router()
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const User = require("../models/User")

router.post("/register",async(req,res)=>{

 const {name,email,password} = req.body

 const hash = await bcrypt.hash(password,10)

 const user = new User({name,email,password:hash})

 await user.save()

 res.json(user)

})

router.post("/login",async(req,res)=>{

 const {email,password} = req.body

 const user = await User.findOne({email})

 if(!user) return res.status(404).json("User not found")

 const match = await bcrypt.compare(password,user.password)

 if(!match) return res.status(400).json("Invalid password")

 const token = jwt.sign({id:user._id},process.env.JWT_SECRET)

 res.json({token})

})

module.exports = router