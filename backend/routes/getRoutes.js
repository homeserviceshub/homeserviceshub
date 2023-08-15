const express = require("express");
const getRoute = express();
const cors = require("cors");
const bodyParser = require("body-parser");

getRoute.use(cors());
getRoute.use(bodyParser.json());
getRoute.use(express.json());
getRoute.use(express.static("public"));
getRoute.use(bodyParser.urlencoded({ extended: true }));

const getController = require("../controllers/getController");
getRoute.get("/usersData", getController.usersData);

module.exports = getRoute;
