const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect(
    "mongodb+srv://homeserviceshub1:5ecpQMPZyWi9g0mE@homeservicescluster.0zszq0t.mongodb.net/homeserviceshub"
  );
  console.log("Connection Made");
  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use("/", express.static("upload"));

//getting routes
const postRoute = require("./routes/postRoutes");
const getRoute = require("./routes/getRoutes");
app.use(postRoute);
app.use(getRoute);

app.listen(8000, "0.0.0.0", () => {
  console.log("Running");
});
