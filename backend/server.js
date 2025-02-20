const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
const port = process.env.PORT || 8000;

// Connect to MongoDB
async function main() {
  try {
    await mongoose.connect(
      "mongodb+srv://homeserviceshub1:5ecpQMPZyWi9g0mE@homeservicescluster.0zszq0t.mongodb.net/homeserviceshub?retryWrites=true&w=majority"
    );
    console.log("Database connected");
  } catch (err) {
    console.error("Database connection error:", err);
  }
}
main();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use("/", express.static("upload"));

// Serve API Routes
const postRoute = require("./routes/postRoutes");
const getRoute = require("./routes/getRoutes");
app.use("/api", postRoute);
app.use("/api", getRoute);

// Serve React Frontend
const buildPath = path.join(__dirname, "../frontend/build");
app.use(express.static(buildPath)); // Serve static files first

app.get("*", (req, res) => {
  res.sendFile(path.join(buildPath, "index.html"));
});

// Start Server
app.listen(port, "0.0.0.0", () => {
  console.log("Backend is running on port", port);
});
