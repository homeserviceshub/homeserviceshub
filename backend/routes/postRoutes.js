const express = require("express");
const postRoute = express();
const cors = require("cors");
const bodyParser = require("body-parser");
// const AWS = require("aws-sdk");
// const multer = require("multer");
// const multerS3 = require("multer-s3");
const path = require("path");
require("dotenv").config(); // Load environment variables

postRoute.use(cors());
postRoute.use(bodyParser.json());
postRoute.use(express.json());
postRoute.use(express.static("public"));
// postRoute.use(bodyParser.urlencoded({ extended: true }));

// // Configure AWS SDK (IAM role on EC2 will handle authentication)
// const s3 = new AWS.S3({ region: "eu-north-1" });
// //multer is used for image storage
// // Configure Multer-S3
// const upload = multer({
//   storage: multerS3({
//     s3: s3,
//     bucket: "homeserviceshubbucket",
//     acl: "public-read", // Set file visibility (or use "private")
//     metadata: function (req, file, cb) {
//       cb(null, { fieldName: file.fieldname });
//     },
//     key: function (req, file, cb) {
//       cb(null, `uploads/${Date.now()}${path.extname(file.originalname)}`);
//     },
//   }),
//   // limits: { fileSize: 50 * 1024 * 1024 }, // 50MB limit
// });
// // Upload route
// postRoute.post("/api/upload", upload.single("media"), (req, res) => {
//   if (!req.file) {
//     return res.status(400).json({ error: "No file uploaded" });
//   }

//   res.json({ fileUrl: req.file.location }); // S3 URL of the uploaded file
// });

// postRoute.post(
//   "/api/uploadVerification",
//   upload.fields([
//     { name: "adharFront", maxCount: 1 },
//     { name: "adharBack", maxCount: 1 },
//   ]),
//   (req, res) => {
//     const frontFilePath = req.files["adharFront"][0];
//     const backFilePath = req.files["adharBack"][0];
//     res.json({ frontFilePath, backFilePath });
//   }
// );

const postController = require("../controllers/postController");
postRoute.post("/api/signup", postController.signUp);
postRoute.post("/api/login", postController.login);
postRoute.post("/api/userdata", postController.getUserData);
postRoute.post("/api/serviceRequest", postController.serviceRequest);
postRoute.post("/api/updateuser", postController.updateuser);
postRoute.post("/api/updateaceuser", postController.updateaceuser);
postRoute.post(
  "/api/updateaceverification",
  postController.updateAceVerification
);
postRoute.post("/api/checkace", postController.checkace);
postRoute.post("/api/acedata", postController.acedata);
postRoute.post("/api/getreviews", postController.getreviews);
postRoute.post("/api/getrequestdata", postController.getServiceRequests);
postRoute.post("/api/newreview", postController.newReview);
postRoute.post("/api/ace/signup", postController.acesignup);
postRoute.post("/api/ace/signin", postController.acesignin);
postRoute.post(
  "/api/updateServiceRequest",
  postController.updateServiceRequest
);
postRoute.post(
  "/api/evaluateservicerequest",
  postController.evaluateServiceRequest
);
postRoute.post("/api/getprojectsdata", postController.getprojectsdata);
postRoute.post("/api/getprojectsdone", postController.getProjectsDone);
postRoute.post(
  "/api/rejectservicerequest",
  postController.rejectServiceRequest
);
postRoute.post(
  "/api/acceptservicerequest",
  postController.acceptServiceRequest
);
postRoute.post(
  "/api/completeservicerequest",
  postController.completeServiceRequest
);
postRoute.post("/api/getreviewdata", postController.getReviewData);
postRoute.post("/api/checkbookmark", postController.checkBookmark);
postRoute.post("/api/getbookmarksdata", postController.getBookmarkData);
postRoute.post("/api/updatebookmark", postController.updateBookmark);
postRoute.post("/api/filtercategorydata", postController.filterCategoryData);
postRoute.post("/api/filterCompanydata", postController.filterCompanyData);
postRoute.post(
  "/api/loadmorecategorydata",
  postController.loadMoreCategoryData
);
postRoute.post("/api/loadmorecompanydata", postController.loadMoreCompanyData);
postRoute.post("/api/reviewdatarequest", postController.reviewDataRequest);
postRoute.post("/api/updateacetitle", postController.updateAceTitle);
postRoute.post("/api/checkacemobile", postController.checkacemobile);
postRoute.post("/api/resetpassword", postController.resetPassword);
postRoute.post(
  "/api/ace/updatesubscription",
  postController.updateSubscription
);
postRoute.post(
  "/api/customerrejectservicerequest",
  postController.customerRejectServiceRequest
);
postRoute.post(
  "/api/filtertopcountryacedata",
  postController.filterTopCountryAceData
);

module.exports = postRoute;
