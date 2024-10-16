const express = require("express");
const app = express();
const cors = require("cors");
// const https = require("https"); // Required for creating an HTTPS server
// const fs = require("fs"); // Required for reading SSL certificate files
const https = require("node:https");
const fs = require("node:fs");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const port = process.env.PORT || 8000;
// const port = 443;  // HTTPS default port
const path = require("path");
const _dirname = path.dirname("");
const buildPath = path.join(__dirname, "../frontend/build");
app.use(express.static(buildPath));
main().catch((err) => console.log(err));

// Load SSL Certificate
const privateKey = fs.readFileSync(
  path.join(
    __dirname,
    "ssl/keys/bfdb9_a093f_fd5192dbb946bd08d2d6342540fa5fdd.key"
  ),
  "utf8"
);
const privateKey2 = fs.readFileSync(
  path.join(
    __dirname,
    "ssl/keys/c7ed7_9be65_862d7a263a2980eecb39f167e7dc7b45.key"
  ),
  "utf8"
);

const certificate = fs.readFileSync(
  path.join(
    __dirname,
    "ssl/certs/homeserviceshub_in_bfdb9_a093f_1758175768_0f0b53b11973782ea9d431635124b40e.crt"
  ),
  "utf8"
);
const ca = fs.readFileSync(
  path.join(
    __dirname,
    "ssl/certs/homeserviceshub_in_c7ed7_9be65_1734419375_50cd50b85c930d0a73caba50ec160cb8.crt"
  ),
  "utf8"
);
// HTTPS options
const credentials = { key: privateKey, cert: certificate, ca: ca };

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
    origin: "https://www.homeserviceshub.in",
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

// Redirect HTTP to HTTPS
app.use((req, res, next) => {
  if (req.secure) {
    return next();
  }
  res.redirect("https://" + req.headers.host + req.url);
});
const httpsServer = https.createServer(credentials, app);

httpsServer.listen(8000, () => {
  console.log(`HTTPS Server running on port ${port}`);
});

//Http
// app.listen(port, "0.0.0.0", () => {
//   console.log("Backend is Running");
// });

// const options = {
//   key: fs.readFileSync("private-key.pem"),
//   cert: fs.readFileSync("certificate.pem"),
// };

// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).send("Something broke!");
// });

// https
//   .createServer(credentials, (req, res) => {
//     res.writeHead(200);
//     res.end("hello world\n");
//   })
//   .listen(8000);

// const httpsServer = https.createServer(
//   {
//     key: fs.readFileSync(
//       "ssl/keys/bfdb9_a093f_fd5192dbb946bd08d2d6342540fa5fdd.key"
//     ),
//     cert: fs.readFileSync(
//       "ssl/certs/homeserviceshub_in_bfdb9_a093f_1758175768_0f0b53b11973782ea9d431635124b40e.crt"
//     ),
//   },
//   app
// );

// httpsServer.listen(8000, () => {
//   console.log("HTTPS Server running on port 8000");
// });
