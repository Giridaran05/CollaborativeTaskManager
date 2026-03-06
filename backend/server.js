const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const http = require("http");
const { Server } = require("socket.io");

const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const workspaceRoutes = require("./routes/workspaceRoutes");
const projectRoutes = require("./routes/projectRoutes");
const taskRoutes = require("./routes/taskRoutes");
const notificationRoutes = require("./routes/notificationRoutes");
const uploadRoutes = require("./routes/uploadRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const activityRoutes = require("./routes/activityRoutes");

dotenv.config();

// -------------------
// Connect Database
// -------------------

connectDB();

const app = express();

// -------------------
// Allowed Origins
// -------------------

const allowedOrigins = [
  "http://localhost:5173",
  "https://collaborative-task-manager-bay.vercel.app"
];

// -------------------
// Middlewares
// -------------------

app.use(express.json());

app.use(
  cors({
    origin: function (origin, callback) {

      if (!origin) return callback(null, true);

      if (allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }

    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
  })
);

// handle preflight
app.options("*", cors());

// -------------------
// Routes
// -------------------

app.use("/api/auth", authRoutes);
app.use("/api/workspaces", workspaceRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/activities", activityRoutes);

// Root Route
app.get("/", (req, res) => {
  res.send("API Running");
});

// -------------------
// Create HTTP Server
// -------------------

const server = http.createServer(app);

// -------------------
// Socket.IO Setup
// -------------------

const io = new Server(server, {
  cors: {
    origin: allowedOrigins,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true
  }
});

// -------------------
// Track Online Users
// -------------------

let onlineUsers = {};

io.on("connection", (socket) => {

  console.log("User connected:", socket.id);

  socket.on("userOnline", (userId) => {
    onlineUsers[userId] = socket.id;
    io.emit("onlineUsers", Object.keys(onlineUsers));
  });

  socket.on("taskMoved", (data) => {
    io.emit("taskUpdated", data);
  });

  socket.on("newComment", (data) => {
    io.emit("commentAdded", data);
  });

  socket.on("memberJoined", (data) => {
    io.emit("workspaceUpdated", data);
  });

  socket.on("disconnect", () => {

    console.log("User disconnected:", socket.id);

    for (let userId in onlineUsers) {
      if (onlineUsers[userId] === socket.id) {
        delete onlineUsers[userId];
      }
    }

    io.emit("onlineUsers", Object.keys(onlineUsers));
  });

});

// -------------------
// Start Server
// -------------------

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});