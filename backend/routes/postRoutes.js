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
    cb(null, "./upload/images"); // Set your destination folder
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

// Upload route
postRoute.post("/upload", upload.single("media"), (req, res) => {
  const filePath = req.file;
  res.json({ filePath });
});

const postController = require("../controllers/postController");
postRoute.post("/signup", postController.signUp);
postRoute.post("/login", postController.login);
postRoute.post("/userdata", postController.getUserData);
postRoute.post("/serviceRequest", postController.serviceRequest);
postRoute.post("/updateuser", postController.updateuser);
postRoute.post("/updateaceuser", postController.updateaceuser);
postRoute.post("/checkace", postController.checkace);
postRoute.post("/acedata", postController.acedata);
postRoute.post("/getreviews", postController.getreviews);
postRoute.post("/getrequestdata", postController.getServiceRequests);
postRoute.post("/newreview", postController.newReview);
postRoute.post("/ace/signup", postController.acesignup);
postRoute.post("/ace/signin", postController.acesignin);
postRoute.post("/updateServiceRequest", postController.updateServiceRequest);
postRoute.post(
  "/evaluateservicerequest",
  postController.evaluateServiceRequest
);
postRoute.post("/getprojectsdata", postController.getprojectsdata);
postRoute.post("/getprojectsdone", postController.getProjectsDone);
postRoute.post("/rejectservicerequest", postController.rejectServiceRequest);
postRoute.post("/acceptservicerequest", postController.acceptServiceRequest);
postRoute.post(
  "/completeservicerequest",
  postController.completeServiceRequest
);
postRoute.post("/getreviewdata", postController.getReviewData);
postRoute.post("/checkbookmark", postController.checkBookmark);
postRoute.post("/getbookmarksdata", postController.getBookmarkData);
postRoute.post("/updatebookmark", postController.updateBookmark);
postRoute.post("/filtercategorydata", postController.filterCategoryData);
postRoute.post("/filterCompanydata", postController.filterCompanyData);
postRoute.post("/loadmorecategorydata", postController.loadMoreCategoryData);
postRoute.post("/loadmorecompanydata", postController.loadMoreCompanyData);
postRoute.post("/reviewdatarequest", postController.reviewDataRequest);
postRoute.post(
  "/filtertopcountryacedata",
  postController.filterTopCountryAceData
);

module.exports = postRoute;
