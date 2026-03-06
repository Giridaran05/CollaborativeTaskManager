const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const http = require("http")
const {Server} = require("socket.io")
require("dotenv").config()

const authRoutes = require("./routes/authRoutes")
const workspaceRoutes = require("./routes/workspaceRoutes")
const projectRoutes = require("./routes/projectRoutes")
const taskRoutes = require("./routes/taskRoutes")
const dashboardRoutes = require("./routes/dashboardRoutes")
const notificationRoutes = require("./routes/notificationRoutes")

const app = express()

app.use(express.json())
app.use(cors())

const server = http.createServer(app)

const io = new Server(server,{
 cors:{origin:"*"}
})

io.on("connection",(socket)=>{
 console.log("User connected")

 socket.on("taskMoved",(data)=>{
  io.emit("taskUpdated",data)
 })

 socket.on("commentAdded",(data)=>{
  io.emit("commentUpdate",data)
 })
})

app.use("/api/auth",authRoutes)
app.use("/api/workspaces",workspaceRoutes)
app.use("/api/projects",projectRoutes)
app.use("/api/tasks",taskRoutes)
app.use("/api/dashboard",dashboardRoutes)
app.use("/api/notifications",notificationRoutes)

mongoose.connect(process.env.MONGO_URI)
.then(()=>{
 console.log("MongoDB connected")
 server.listen(process.env.PORT || 5000,()=>{
  console.log("Server running")
 })
})
.catch(err=>console.log(err))