const express = require("express");
const postRoute = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const multer = require("multer");
const path = require("path");

postRoute.use(cors());
postRoute.use(bodyParser.json());
postRoute.use(express.json());
postRoute.use(express.static("public"));
postRoute.use(bodyParser.urlencoded({ extended: true }));

//multer is used for image storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(
      null,
      path.join(__dirname, "../public/postImages"),
      function (error, success) {
        if (error) {
          console.log(error, "in destination");
        }
      }
    );
  },
  filename: function (req, file, cb) {
    new Date() + "-" + file.originalname;
    cb(null, name, function (error, success) {
      if (error) {
        console.log(error, "in destination");
      }
    });
  },
});
const upload = multer({ storage: storage });

const postController = require("../controllers/postController");
postRoute.post("/signup", postController.signUp);
postRoute.post("/login", postController.login);
postRoute.post("/userdata", postController.getUserData);
postRoute.post("/serviceRequest", postController.serviceRequest);

module.exports = postRoute;
