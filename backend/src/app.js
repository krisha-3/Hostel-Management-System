const express = require("express");
const cors = require("cors");

const roomRoutes = require("./routes/roomRoutes");

const studentRoutes = require("./routes/studentRoutes");

const dashboardRoutes = require("./routes/dashboardRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Hostel Management API Running",
  });
});

app.use("/api/rooms", roomRoutes);

app.use("/api/students", studentRoutes);

app.use("/api/dashboard", dashboardRoutes);

module.exports = app;
