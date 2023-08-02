const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();
app.use(cors());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "homeservicesdatabase",
});

app.get("/homeservices", (re, res) => {
  const sql = "SELECT * FROM homeservices";
  db.query(sql, (err, data) => {
    if (err) {
      return res.json(err);
    }
    return res.json(data);
  });
});

app.get("/", (re, res) => {
  return res.json("FromBackend");
});

app.listen(8000, () => {
  console.log("Running");
});
