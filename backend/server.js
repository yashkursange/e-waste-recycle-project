const express = require("express");
const cors = require("cors");
const http = require("http");
const socketIO = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketIO(server, {
  cors: {
    origin: "http://localhost:5173", // Vite dev server
    methods: ["GET", "POST"],
  },
});

app.use(cors());
app.use(express.json());

app.use("/auth", require("./routes/auth"));
app.use("/pickup", require("./routes/pickup"));
app.use("/rewards", require("./routes/rewards"));
app.use("/dashboard", require("./routes/dashboard"));
app.use("/leaderboard", require("./routes/leaderboard"));

// Store active driver tracking sessions
const driverSessions = {};

// Socket.io connection handlers
io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);

  // When user joins to track a driver
  socket.on("join-pickup-room", (data) => {
    const { pickupId, userId } = data;
    const roomName = `pickup-${pickupId}`;
    
    socket.join(roomName);
    console.log(`User ${userId} joined room ${roomName}`);
    
    // Store session info
    driverSessions[socket.id] = {
      userId,
      pickupId,
      roomName,
      joinedAt: new Date(),
    };
  });

  // Handle disconnect
  socket.on("disconnect", () => {
    delete driverSessions[socket.id];
    console.log(`User disconnected: ${socket.id}`);
  });
});

server.listen(5000, () => {
  console.log("Socket.io server running on port 5000");
});

module.exports = { io, app };
