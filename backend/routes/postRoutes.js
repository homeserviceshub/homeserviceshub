const express = require("express");
const postRoute = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
} = require("@aws-sdk/client-s3");
const multerS3 = require("multer-s3");
const { Upload } = require("@aws-sdk/lib-storage");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const multer = require("multer");
require("dotenv").config();

// Import controllers
const userController = require("../controllers/userController");
const serviceController = require("../controllers/serviceController");
const reviewController = require("../controllers/reviewController");
const aceController = require("../controllers/aceController");
const adminController = require("../controllers/adminController");

postRoute.use(cors());
postRoute.use(bodyParser.json());
postRoute.use(express.json());
postRoute.use(express.static("public"));
postRoute.use(bodyParser.urlencoded({ extended: true }));

// Configure AWS SDK (v3)
const s3Client = new S3Client({
  region: "eu-north-1",
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
      cb(null, `uploads/${Date.now()}_${file.originalname}`);
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
      cb(null, `verifydocs/${Date.now()}_${file.originalname}`);
    },
  }),
  limits: { fileSize: 50 * 1024 * 1024 }, // 50MB limit
});

// AWS S3 Upload Routes
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
    { name: "panCard", maxCount: 1, optional: true },
  ]),
  (req, res) => {
    try {
      const frontFilePath = req.files["adharFront"][0].location;
      const backFilePath = req.files["adharBack"][0].location;

      const responseData = {
        frontFilePath,
        backFilePath,
      };

      if (req.files["panCard"] && req.files["panCard"][0]) {
        responseData.panFilePath = req.files["panCard"][0].location;
      }

      res.json(responseData);
    } catch (error) {
      console.error("Upload error:", error);
      res.status(500).json({ error: "File upload failed" });
    }
  }
);

// User Routes
postRoute.post("/signup", userController.signUp);
postRoute.post("/login", userController.login);
postRoute.post("/userdata", userController.getUserData);
postRoute.post("/updateuser", userController.updateuser);
postRoute.post("/checkbookmark", userController.checkBookmark);
postRoute.post("/getbookmarksdata", userController.getBookmarkData);
postRoute.post("/updatebookmark", userController.updateBookmark);
postRoute.post("/resetpassword", userController.resetPassword);

// Service Routes
postRoute.post("/serviceRequest", serviceController.serviceRequest);
postRoute.post("/updateServiceRequest", serviceController.updateServiceRequest);
postRoute.post("/acceptservicerequest", serviceController.acceptServiceRequest);
postRoute.post(
  "/completeservicerequest",
  serviceController.completeServiceRequest
);
postRoute.post("/rejectservicerequest", serviceController.rejectServiceRequest);
postRoute.post(
  "/customerrejectservicerequest",
  serviceController.customerRejectServiceRequest
);
postRoute.post("/getrequestdata", serviceController.getServiceRequests);
postRoute.post("/getprojectsdata", serviceController.getprojectsdata);
postRoute.post("/getprojectsdone", serviceController.getProjectsDone);

// Review Routes
postRoute.post("/newreview", reviewController.newReview);
postRoute.post("/getreviewdata", reviewController.getReviewData);
postRoute.post("/getreviews", reviewController.getreviews);
postRoute.post("/reviewdatarequest", reviewController.reviewDataRequest);

// Ace Routes
postRoute.post("/ace/signup", aceController.acesignup);
postRoute.post("/ace/signin", aceController.acesignin);
postRoute.post("/checkace", aceController.checkace);
postRoute.post("/acedata", aceController.acedata);
postRoute.post("/updateaceuser", aceController.updateaceuser);
postRoute.post("/updateaceverification", aceController.updateAceVerification);
postRoute.post("/filtercategorydata", aceController.filterCategoryData);
postRoute.post("/filterCompanydata", aceController.filterCompanyData);
postRoute.post("/loadmorecategorydata", aceController.loadMoreCategoryData);
postRoute.post("/loadmorecompanydata", aceController.loadMoreCompanyData);
postRoute.post(
  "/filtertopcountryacedata",
  aceController.filterTopCountryAceData
);
postRoute.post("/updateacetitle", aceController.updateAceTitle);
postRoute.post("/checkacemobile", aceController.checkacemobile);
postRoute.post("/ace/updatesubscription", aceController.updateSubscription);

//admin routes
postRoute.post("/dashboard/getclients", adminController.getClients);
postRoute.post("/dashboard/getcustomers", adminController.getCustomers);
postRoute.post("/dashboard/getreviews", adminController.getReviews);
postRoute.post(
  "/dashboard/getservicerequests",
  adminController.getServiceRequests
);
postRoute.post("/dashboard/getsubscriptions", adminController.getSubscriptions);
postRoute.post("/dashboard/getuserdata", adminController.getUserData);
postRoute.post(
  "/dashboard/createservicerequest",
  adminController.createServiceRequest
);
postRoute.post(
  "/dashboard/updateservicerequest",
  adminController.updateServiceRequest
);
postRoute.post(
  "/dashboard/getserviceproviders",
  adminController.getServiceProviders
);

module.exports = postRoute;
