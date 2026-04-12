const express = require("express");
const cors = require("cors");
const http = require("http");

const app = express();
const server = http.createServer(app);

app.use(cors());
app.use(express.json());

app.use("/auth", require("./routes/auth"));
app.use("/pickup", require("./routes/pickup"));
app.use("/rewards", require("./routes/rewards"));
app.use("/dashboard", require("./routes/dashboard"));
app.use("/leaderboard", require("./routes/leaderboard"));
app.use("/profile", require("./routes/profile"));
app.use("/notifications", require("./routes/notifications"));

server.listen(5000, () => {
  console.log("Server running on port 5000 without Socket.io");
});

module.exports = { app };
