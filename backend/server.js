const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 8000;

// Connect to MongoDB
async function main() {
  try {
    await mongoose.connect(process.env.MONGOOSE_CONNECT);

    console.log("Database connected");
  } catch (err) {
    console.error("Database connection error:", err);
  }
}
main();

// Middleware
app.use(cors());
// app.use(bodyParser.json());
app.use(express.json());
app.use("/", express.static("upload"));

// Load API Routes **BEFORE** serving frontend
const postRoute = require("./routes/postRoutes");
const getRoute = require("./routes/getRoutes");

// ✅ Use `/api` prefix to match frontend requests
app.use("/api", postRoute);
app.use("/api", getRoute);

// Serve React Frontend
const buildPath = path.join(__dirname, "../frontend/build");
app.use(express.static(buildPath));

app.get("*", (req, res) => {
  res.sendFile(path.join(buildPath, "index.html"));
});

// Start Server
app.listen(port, "0.0.0.0", () => {
  console.log("Backend is running on port", port);
});
