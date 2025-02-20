const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const port = process.env.PORT || 8000;
const path = require("path");

const buildPath = path.join(__dirname, "../frontend/build");
app.get("*", (req, res) => {
  res.sendFile(path.join(buildPath));
});
app.use(express.static(buildPath));
main().catch((err) => console.log(err));

async function main() {
  await mongoose
    .connect(
      "mongodb+srv://homeserviceshub1:5ecpQMPZyWi9g0mE@homeservicescluster.0zszq0t.mongodb.net/homeserviceshub?retryWrites=true&w=majority"
    )
    .then(() => console.log("Database connected"))
    .catch((err) => console.log("Database connection error:", err));
  console.log("Connection Made");
  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "HEAD"],
    allowedHeaders: ["Content-Type", "Authorization"], // Add other necessary headers
  })
);

app.use(bodyParser.json());
app.use(express.json());
app.use("/", express.static("upload"));

//getting routes
const postRoute = require("./routes/postRoutes");
const getRoute = require("./routes/getRoutes");
app.use(postRoute);
app.use(getRoute);
app.get("/", (req, res) => {
  res.send("Welcome to Home Services Hub!");
});

//Http
app.listen(port, "0.0.0.0", () => {
  console.log("Backend is Running on", port);
});
