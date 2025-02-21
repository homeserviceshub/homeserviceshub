const express = require("express");
const postRoute = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const fs = require("fs");
const usersModel = require("../models/usersModel");

const {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
} = require("@aws-sdk/client-s3");
const multerS3 = require("multer-s3");
const { Upload } = require("@aws-sdk/lib-storage");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const multer = require("multer");
const path = require("path");
require("dotenv").config(); // Load environment variables

postRoute.use(cors());
postRoute.use(bodyParser.json());
postRoute.use(express.json());
postRoute.use(express.static("public"));
postRoute.use(bodyParser.urlencoded({ extended: true }));

// Configure AWS SDK (v3)
const s3Client = new S3Client({
  region: "eu-north-1", // e.g., "us-east-1"
  // for running on localhost
  // credentials: {
  //   accessKeyId: process.env.AWS_ACCESS_KEY,
  //   secretAccessKey: process.env.AWS_SECRET_KEY,
  // },
});
const upload = multer({
  storage: multerS3({
    s3: s3Client,
    bucket: "homeserviceshubbucket",
    metadata: (req, file, cb) => {
      cb(null, { fieldName: file.fieldname });
    },
    contentType: multerS3.AUTO_CONTENT_TYPE,
    key: (req, file, cb) => {
      cb(null, `uploads/${Date.now()}_${file.originalname}`); // Store inside "uploads/" folder in S3
    },
  }),
  limits: { fileSize: 50 * 1024 * 1024 }, // 50MB limit
});
const uploadVerify = multer({
  storage: multerS3({
    s3: s3Client,
    bucket: "homeserviceshubbucket",
    metadata: (req, file, cb) => {
      cb(null, { fieldName: file.fieldname });
    },
    contentType: multerS3.AUTO_CONTENT_TYPE,
    key: (req, file, cb) => {
      cb(null, `verifydocs/${Date.now()}_${file.originalname}`); // Store inside "uploads/" folder in S3
    },
  }),
  limits: { fileSize: 50 * 1024 * 1024 }, // 50MB limit
});

// Upload route
postRoute.post("/upload", upload.single("media"), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }
  res.json({ fileUrl: req.file.location });
});

postRoute.post(
  "/uploadVerification",
  uploadVerify.fields([
    { name: "adharFront", maxCount: 1 },
    { name: "adharBack", maxCount: 1 },
  ]),
  (req, res) => {
    const frontFilePath = req.files["adharFront"][0].location;
    const backFilePath = req.files["adharBack"][0].location;
    res.json({ frontFilePath, backFilePath });
  }
);

const postController = require("../controllers/postController");
postRoute.post("/signup", postController.signUp);
postRoute.post("/login", postController.login);
postRoute.post("/userdata", postController.getUserData);
postRoute.post("/serviceRequest", postController.serviceRequest);
postRoute.post("/updateuser", postController.updateuser);
postRoute.post("/updateaceuser", postController.updateaceuser);
postRoute.post("/updateaceverification", postController.updateAceVerification);
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
postRoute.post("/updateacetitle", postController.updateAceTitle);
postRoute.post("/checkacemobile", postController.checkacemobile);
postRoute.post("/resetpassword", postController.resetPassword);
postRoute.post("/ace/updatesubscription", postController.updateSubscription);
postRoute.post(
  "/customerrejectservicerequest",
  postController.customerRejectServiceRequest
);
postRoute.post(
  "/filtertopcountryacedata",
  postController.filterTopCountryAceData
);

module.exports = postRoute;
