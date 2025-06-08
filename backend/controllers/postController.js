const usersModel = require("../models/usersModel");
const reviewsModel = require("../models/reviewsModel");
const serviceRequestModel = require("../models/serviceRequestModel");
const bookmarksModel = require("../models/bookmarkModel");
const nodemailer = require("nodemailer");
const cron = require("node-cron");
const jwt = require("jsonwebtoken");
const argon2 = require("argon2");

const hashPassword = async (password) => {
  return await argon2.hash(password);
};
const verifyPassword = async (password, hash) => {
  return await argon2.verify(hash, password);
};

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "homeserviceshub1@gmail.com",
    pass: "ibjn tatg twmg dnct",
  },
});

const sendEmail = async (to, subject, html) => {
  const mailOptions = {
    from: "homeserviceshub1@gmail.com",
    to: to,
    subject: subject,
    html: html,
  };

  try {
    await transporter.sendMail(mailOptions);
    // console.log("Email sent successfully");
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

// Schedule task to run daily at midnight
cron.schedule("0 0 * * *", async () => {
  console.log("Running daily subscription reset check");

  const now = new Date();

  try {
    const users = await usersModel.find({
      "aceData.subscriptionPlan.expirationDate": { $lte: now },
    });

    for (const user of users) {
      user.aceData.taskAcceptanceLimit = 3;
      user.aceData.maxConcurrentTasks = 1;
      user.aceData.subscriptionPlan.expirationDate = null; // Clear expiration date

      await user.save();

      console.log(`Reset subscription for user ${user._id}`);
    }
  } catch (error) {
    console.error("Error resetting subscriptions:", error);
  }
});

// Function to generate a random OTP
const generateOTP = () => {
  const otp = Math.floor(100000 + Math.random() * 900000);
  return otp;
};

//user requests

const signUp = async (req, res) => {
  try {
    // Check if username or phone number already exists
    const existingUser = await usersModel.findOne({
      $or: [{ email: req.body.email }, { number: req.body.number }],
    });

    // If a user with the given username or number already exists, return an error message
    if (existingUser) {
      if (existingUser.email === req.body.email) {
        return res
          .status(200)
          .send({ success: false, message: "email already exists" });
      }
      if (existingUser.number === req.body.number) {
        return res
          .status(200)
          .send({ success: false, message: "Phone number already exists" });
      }
    }

    // Create a new user if no existing user with the given username or number is found
    const encrytedPassword = await hashPassword(req.body.password);
    const newUser = new usersModel({
      username: req.body.username,
      email: req.body.email,
      password: encrytedPassword,
      number: req.body.number,
      joiningDate: new Date(),
    });
    const doc = await newUser.save();
    // Return success message and user data
    res.status(200).send({
      success: true,
      message: "New user created successfully.",
      data: doc,
    });
  } catch (error) {
    // Handle any errors that occur during the process
    res.status(400).send({ success: false, message: error.message });
  }
};
const login = async (req, res) => {
  try {
    const emailOrNumber = req.body.email;
    if (!emailOrNumber) {
      return res.json({ message: "No User Found" });
    }

    let query = {
      $or: [{ email: emailOrNumber }, { number: emailOrNumber }],
    };

    // Find a single user instead of an array
    const user = await usersModel.findOne(query);
    if (!user) {
      return res.json({ message: "User not found" });
    } else {
      if (user.password.startsWith("$")) {
        const passcheck = await verifyPassword(
          req.body.password,
          user.password
        );
        if (!passcheck) {
          return res.json({ message: "Incorrect password" });
        }
      } else {
        if (req.body.password !== user.password) {
          return res.json({ message: "Incorrect password" });
        }
      }

      return res.json({ message: "Login successful", user });
    }
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ message: "An error occurred" });
  }
};

const checkBookmark = async (req, res) => {
  try {
    const users = await bookmarksModel.find({
      customerID: req.body.customerID,
      clientID: req.body.clientID,
    });

    if (users.length > 0) {
      return res.json(users);
    } else {
      return res.json({ message: "No User Found" });
    }
  } catch (error) {
    console.error("Error:", error);
  }
};
const getBookmarkData = async (req, res) => {
  try {
    const bookmarks = await bookmarksModel.find({
      customerID: req.body.customerID,
    });

    if (bookmarks.length > 0) {
      const usersData = [];
      for (const bookmark of bookmarks) {
        const userData = await usersModel.findOne({
          _id: bookmark.clientID,
        });
        if (userData) {
          usersData.push(userData);
        }
      }
      return res.json(usersData);
    } else {
      return res.json({ message: "No Bookmarks Yet" });
    }
  } catch (error) {
    console.error("Error:", error);
    return res
      .status(500)
      .json({ message: "An error occurred while fetching bookmark data." });
  }
};
const updateBookmark = async (req, res) => {
  try {
    const existingBookmark = await bookmarksModel.findOne({
      customerID: req.body.customerID,
      clientID: req.body.clientID,
    });

    if (existingBookmark) {
      // Data exists, delete it
      await bookmarksModel.deleteOne({
        customerID: req.body.customerID,
        clientID: req.body.clientID,
      });
      res.json({ message: "Bookmark removed successfully" });
    } else {
      // No data exists, create new data
      const newBookmark = new bookmarksModel({
        customerID: req.body.customerID,
        clientID: req.body.clientID,
        bookmarkDate: new Date(),
      });
      await newBookmark.save();
      res.json({ message: "Bookmark added successfully" });
    }
  } catch (error) {
    console.error("Error:", error);
  }
};
const getreviews = async (req, res) => {
  const { id } = req.body; // Assuming userId is passed in the request params

  try {
    const reviews = await reviewsModel.find({ reviewTo: id });
    if (!reviews) {
      return res.status(404).json({
        message: "no review found.",
      });
    }
    return res.json(reviews);
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
const getprojectsdata = async (req, res) => {
  const { customerID, clientID, from, to } = req.body;
  if (from && to) {
    try {
      let projects;
      if (customerID) {
        projects = await serviceRequestModel.find({
          customerID: customerID,
        });
      } else {
        projects = await serviceRequestModel.find({
          clientID: clientID,
          requestDate: {
            $gte: new Date(from),
            $lte: new Date(to),
          }, // Filter by createdAt date field within the specified range
        });
      }

      if (projects.length === 0) {
        return res.json({ message: "No Projects Done Yet" });
      }
      return res.json(projects);
    } catch (error) {
      console.error("Error:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  } else {
    try {
      let projects;
      if (customerID) {
        projects = await serviceRequestModel.find({
          customerID: customerID,
        });
      } else {
        projects = await serviceRequestModel.find({
          clientID: clientID,
        });
      }

      if (projects.length === 0) {
        return res.json({ message: "No Projects Done Yet" });
      }
      return res.json(projects);
    } catch (error) {
      console.error("Error:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }
};
const getProjectsDone = async (req, res) => {
  const { clientID } = req.body;
  try {
    const projects = await serviceRequestModel
      .find({ clientID: clientID, status: "completed" })
      .sort({ requestDate: -1 });

    if (projects.length === 0) {
      return res.json({ message: "No Projects Done Yet" });
    }
    return res.json(projects);
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
const getUserData = async (req, res) => {
  const { _id } = req.body;
  if (!_id || _id === "null" || _id === null) {
    return res.status(400).json({ message: "Invalid ID Or No ID" });
  } else
    try {
      const users = await usersModel.find({
        _id: req.body._id,
      });
      return res.json(users);
    } catch (error) {
      console.error("Error:", error);
    }
};
const updateuser = async (req, res) => {
  const { id } = req.body;
  try {
    const User = await usersModel.findById(id);
    if (!User) {
      return res.status(404).json({ message: "user not found" });
    }

    // Update the User fields with new data
    Object.assign(User, req.body);

    // Save the updated User
    await User.save();

    res.status(200).json({ message: "User updated successfully" });
  } catch (error) {
    res.status(400).send({ success: false, message: error.message });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { id, email } = req.body;

    if (!email || !id) {
      return res
        .status(400)
        .json({ message: "User ID and email are required." });
    }

    // Generate a token that expires in 15 minutes
    const token = jwt.sign({ id, email }, process.env.EDITOR, {
      expiresIn: "15m",
    });

    // Reset link with token
    const resetLink = `http://localhost:3000/reset-password?token=${token}`;
    // const resetLink = `https://homeserviceshub.in/reset-password?token=${token}`;

    // Email content
    const emailContent = `
    <p>Dear User,</p>
    <p>We received a request to reset your password. Click the link below to reset your password. This link is valid for <b>15 minutes</b>.</p>
    <p><a href="${resetLink}" target="_blank" style="color: blue; font-weight: bold;">Reset Your Password</a></p>
    <p>If you did not request this, please ignore this email. Your password will remain unchanged.</p>
    <br/>
    <p>Best Regards,</p>
    <p>Your Company Name</p>
  `;
    //send email
    sendEmail(email, "Password Reset Request", emailContent);

    res
      .status(200)
      .json({ message: "Password reset email sent successfully." });
  } catch (error) {
    console.error("Error in resetPassword:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

//service requests

const updateServiceRequest = async (req, res) => {
  const requestId = req.body.requestId;
  try {
    const request = await serviceRequestModel.findById(requestId);
    if (request) {
      Object.assign(request, req.body);
      await user.save();
      res.status(200).json({ message: "User updated successfully" });
    } else {
      res.status(404).json({ message: "Service request not found" });
    }
  } catch (error) {
    res.status(400).send({ success: false, message: error.message });
  }
};
const evaluateServiceRequest = async (req, res) => {
  const { id } = req.body;

  try {
    const request = await serviceRequestModel.findOne({ _id: id });
    const client = await usersModel.findOne({ _id: request.clientID });
    if (!request) {
      return res.status(404).json({ message: "Service request not found" });
    }

    // Calculate evaluation time in minutes
    const evaluationDate = new Date().getTime();
    const requestDate = new Date(
      client.aceData?.lastTaskCompleted
        ? client.aceData?.lastTaskCompleted
        : request.requestDate
    ).getTime();
    const evaluationTime = (evaluationDate - requestDate) / (1000 * 60);

    // Calculate responsiveness rating based on evaluation time
    let responsivenessRating = 0;
    if (evaluationTime <= 5) {
      responsivenessRating = 5;
    } else if (evaluationTime <= 15) {
      responsivenessRating = 4;
    } else if (evaluationTime <= 30) {
      responsivenessRating = 3;
    } else if (evaluationTime <= 60) {
      responsivenessRating = 2;
    } else {
      responsivenessRating = 1;
    }

    // Update service request with responsiveness rating
    const updatedRequest = await serviceRequestModel.findByIdAndUpdate(
      id,
      {
        responsiveness: responsivenessRating,
        status: "evaluating",
      },
      { new: true }
    );
    // Calculate the average responsiveness rating for all projects done by the client
    const clientProjects = await serviceRequestModel.find({
      clientID: updatedRequest.clientID,
    });
    let totalResponsivenessRating = 0;
    clientProjects.forEach((project) => {
      const responsiveness = +project.responsiveness;
      if (!isNaN(responsiveness)) {
        totalResponsivenessRating += responsiveness;
      }
    });
    const averageResponsiveness =
      totalResponsivenessRating / clientProjects.length;
    const updatedUser = await usersModel.findByIdAndUpdate(
      updatedRequest.clientID,
      { "aceData.responsiveness": averageResponsiveness },
      { new: true }
    );
    if (!updatedRequest) {
      return res.status(404).json({ message: "Service request not found" });
    }
    const evaluationEmail = `
    <p>Dear Customer,</p>
    <p>We're pleased to inform you that your service request is under evaluation.</p>
    <p>You will soon receive a call from ${updatedUser.aceData.companyName} at ${updatedUser.aceData.companyNumber}.</p>
    <p></p>
    <p>Best regards,<br>Home Services Hub</p>
  `;
    sendEmail(
      request.customerDetails.email,
      "Update on Your Service Request Evaluation",
      evaluationEmail
    );
    res.status(200).json({
      message: "Service request evaluation in progress",
      updatedRequest,
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
const acceptServiceRequest = async (req, res) => {
  const { id, price } = req.body;
  try {
    const request = await serviceRequestModel.findOne({ _id: id });
    // Update the service request status to "accepted" and add OTP field
    const otp = generateOTP();
    const updatedRequest = await serviceRequestModel.findByIdAndUpdate(
      id,
      { status: "accepted", price: price, otp: otp }, // Assuming generateOTP() generates a random OTP
      { new: true }
    );
    // Check if the service request was not found
    if (!updatedRequest) {
      return res.status(404).json({ message: "Service request not found" });
    }

    // Increment the projectsOngoing field in the user model
    const updatedUser = await usersModel.findByIdAndUpdate(
      updatedRequest.clientID,
      {
        $inc: { "aceData.projectsOngoing": 1 },
      }
    );
    const acceptedEmail = `
    <p>Dear Customer,</p>
    <p>We're pleased to inform you that your service request for ${request.selectedService} has been accepted by ${updatedUser.aceData.companyName}.</p>
    <p>Your OTP for this request is <strong>${otp}</strong>. Please keep this OTP confidential until your work is completed.</p>
    <p>Thank you for choosing us.</p>
    <p>Best regards,<br>Home Services Hub</p>
  `;
    sendEmail(
      request.customerDetails.email,
      "Service Request Accepted Successfully",
      acceptedEmail
    );
    // Return success response with the updated service request
    res
      .status(200)
      .json({ message: "Service request accepted", updatedRequest });
  } catch (error) {
    // Handle errors
    console.error("Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const completeServiceRequest = async (req, res) => {
  const { id, otpEntered, paymentMethod } = req.body;
  try {
    const request = await serviceRequestModel.findById(id);

    if (!request) {
      return res.status(404).json({ message: "Service request not found" });
    }

    // Check if the OTP entered matches the OTP stored in the service request
    if (request.otp !== parseInt(otpEntered)) {
      return res.status(400).json({ message: "Incorrect OTP entered" });
    } else {
      const updatedRequest = await serviceRequestModel.findByIdAndUpdate(
        (_id = id),
        {
          status: "completed",
          completionDate: new Date(),
          paymentMethod: paymentMethod,
        },
        { new: true } // This option returns the updated document
      );
      await usersModel.findByIdAndUpdate(
        updatedRequest.clientID,
        {
          $inc: {
            "aceData.projectsDone": 1, // Increment projectsDone
            "aceData.projectsOngoing": -1, // Decrement projectsOngoing
          },
          $set: {
            "aceData.lastTaskCompleted": new Date(), // Set the current date and time
          },
        },
        { new: true }
      );

      // Retrieve the user's total projects done (total requests)
      const user = await usersModel.findById(updatedRequest.clientID);
      const totalProjectsDone = user.aceData.projectsDone;
      const avgRating = user.aceData.avgRating;
      const responsiveness = user.aceData.responsiveness;

      // Calculate the reputation
      const totalRequests = await serviceRequestModel.countDocuments({
        clientID: updatedRequest.clientID,
      });
      const reputation = (totalProjectsDone / totalRequests) * 5;
      const overall = (reputation + avgRating + responsiveness) / 3;
      // console.log(
      //   "reputation:",
      //   reputation,
      //   "avgRating:",
      //   avgRating,
      //   "responsiveness:",
      //   responsiveness,
      //   "overall:",
      //   overall
      // );
      // Update the user's reputation
      const clientData = await usersModel.findByIdAndUpdate(
        updatedRequest.clientID,
        {
          "aceData.reputation": reputation,
          "aceData.overallRating": overall,
        }
      );
      res.status(200).json({
        message: "Service request completed",
        updatedRequest,
      });
      const completedEmail = `
        <p>Dear customer,</p>
        <p>We are pleased to inform you that your service request for ${request.selectedService} has been completed successfully. We hope that our team has met your expectations, providing you with a satisfactory experience.</p>
        <p>Your feedback is invaluable to us. If you would like to share your thoughts on the service provided by ${clientData.aceData.companyName}, we invite you to click the link below. Your input helps us continually improve and ensures we maintain the highest standards of quality and customer satisfaction.</p>
        <p><b><a href="https://homeserviceshub.in/review/${clientData._id}/new">Add Review</a></b></p>
        <p>Thank you for choosing us for your service needs</p>
        <p>Best regards,<br>Home Services Hub</p>
      `;
      sendEmail(
        request.customerDetails.email,
        "Service Request Completed Successfully",
        completedEmail
      );
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
const rejectServiceRequest = async (req, res) => {
  const { id } = req.body;

  try {
    // Update the service request status to "rejected"
    const request = await serviceRequestModel.findByIdAndUpdate(
      (_id = id),
      { status: "cancelled" },
      { new: true } // This option returns the updated document
    );

    // Check if the update was successful
    if (!request) {
      return res.status(404).json({ message: "Service request not found" });
    }
    const clientData = await usersModel.findById(request.clientID);
    const rejectedEmail = `
    <p>Dear customer,</p>
    <p>We want to inform that your service request for ${request.selectedService} has been rejected.</p>
    <p>If you want to add a review you can do it </p>
    <p><b><a href="https://homeserviceshub.in/review/${clientData._id}/new">Add Review</a></b></p>
    <p></p>
    <p>Best regards,<br>Home Services Hub</p>
  `;
    sendEmail(
      request.customerDetails.email,
      "Your Service Request has been Rejected",
      rejectedEmail
    );
    // Return the updated request as a response
    res.status(200).json({ message: "Service request rejected", request });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
const customerRejectServiceRequest = async (req, res) => {
  const { id, reason } = req.body;

  try {
    // Update the service request status to "rejected"
    const request = await serviceRequestModel.findByIdAndUpdate(
      (_id = id),
      { status: "cancelled" },
      { customerRejectedReason: reason },
      { new: true } // This option returns the updated document
    );

    // Check if the update was successful
    if (!request) {
      return res.status(404).json({ message: "Service request not found" });
    }
    const clientData = await usersModel.findById(request.clientID);
    const rejectedEmail = `
    <p>Dear customer,</p>
    <p>We want to inform that your service request for ${request.selectedService} has been rejected.</p>
    <p>If you want to add a review you can do it </p>
    <p><b><a href="https://homeserviceshub.in/review/${clientData._id}/new">Add Review</a></b></p>
    <p></p>
    <p>Best regards,<br>Home Services Hub</p>
  `;
    sendEmail(
      request.customerDetails.email,
      "Your Service Request has been Rejected",
      rejectedEmail
    );
    // Return the updated request as a response
    res.status(200).json({ message: "Service request rejected", request });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
const serviceRequest = async (req, res) => {
  try {
    // Record the time of creation
    const requestDate = new Date();

    let newRequest = new serviceRequestModel({
      customerID: req.body.fromDetails.customerID,
      clientID: req.body.fromDetails.clientID,
      customerDetails: {
        name: req.body.fromDetails.fullname,
        email: req.body.fromDetails.email,
        address: req.body.fromDetails.address,
        postalCode: req.body.fromDetails.postalcode,
        number: req.body.fromDetails.number,
      },
      requestDate, // Record the time of creation
      status: req.body.fromDetails.status,
      selectedService: req.body.fromDetails.selectedService,
      accommodation: req.body.fromDetails.accommodation,
      serviceNeed: req.body.fromDetails.serviceNeed,
      discription: req.body.fromDetails.discription,
    });

    const doc = await newRequest.save();
    const clientData = await usersModel.findOne({
      _id: req.body.fromDetails.clientID,
    });
    const customerData = await usersModel.findOne({
      _id: req.body.fromDetails.customerID,
    });
    const newRequestMsgClient = `
    <p>Dear ${clientData.aceData.companyEmail},</p>
    <p>You got a new Service request of <b>${newRequest.selectedService}</b></p>
    <p>For further details goto your profile or <b><a href="https://homeserviceshub.in/ace/request">Click Here</a></b>.</p>
    <p></p>
    <p>Best regards,<br>Home Services Hub</p>
  `;
    const newRequestMsgCustomer = `
    <p>Your Request for <b>${newRequest.selectedService}</b> has been submitted successfully. </p>
    <p></p>
    <p>Best regards,<br>Home Services Hub</p>
  `;
    sendEmail(
      clientData.aceData.companyEmail,
      "New Service Request",
      newRequestMsgClient
    );
    sendEmail(customerData.email, "Request Successfull", newRequestMsgCustomer);
    res.status(200).send({
      success: true,
      message: "New Service Request Created",
      data: doc,
    });
  } catch (error) {
    res.status(400).send({ success: false, message: error.message });
  }
};

const getServiceRequests = async (req, res) => {
  try {
    const services = await serviceRequestModel.find({
      customerID: req.body.id,
    });
    return res.json(services);
  } catch (error) {
    console.error("Error:", error);
  }
};

//review requests

const newReview = async (req, res) => {
  try {
    const reviewData = {
      reviewBy: req.body.reviewData.reviewBy,
      reviewTo: req.body.reviewData.reviewTo,
      stars: req.body.reviewData.stars,
      reviewTitle: req.body.reviewData.title,
      reviewDescription: req.body.reviewData.description,
      reviewDate: req.body.reviewData.date,
    };
    const newReview = new reviewsModel(reviewData);
    await newReview.save();

    // Fetch all reviews for the entity being reviewed
    const allReviews = await reviewsModel.find({
      reviewTo: reviewData.reviewTo,
    });
    const clientData = await usersModel.findById(reviewData.reviewTo);

    // Calculate the total stars and the number of reviews
    let totalStars = 0;
    allReviews.forEach((review) => {
      totalStars += Math.min(review.stars, 5); // Cap the individual stars at 5
    });
    const numberOfReviews = allReviews.length;
    // Calculate the average rating
    const averageRating =
      numberOfReviews === 0 ? 0 : totalStars / numberOfReviews;
    // Update the entity's average rating
    await usersModel.findOneAndUpdate(
      { _id: reviewData.reviewTo },
      {
        $set: {
          "aceData.avgRating": averageRating,
          "aceData.totalReviews": allReviews.length,
        },
      }
    );
    res
      .status(200)
      .json({ message: "Review created successfully", data: newReview });
  } catch (error) {
    res.status(400).send({ success: false, message: error.message });
  }
};
const getReviewData = async (req, res) => {
  try {
    const reviews = await reviewsModel.find({
      reviewBy: req.body.id,
    });
    return res.json(reviews);
  } catch (error) {
    console.error("Error:", error);
  }
};
const reviewDataRequest = async (req, res) => {
  let { id } = req.body; // Assuming userId is passed in the request params

  try {
    if (!Array.isArray(id)) {
      id = [id]; // Convert to array if it's not already an array
    }

    const users = await usersModel.find({ _id: { $in: id } });

    if (!users || users.length === 0) {
      return res.status(404).json({
        message: "Users not found.",
      });
    }

    return res.json(users);
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

//ace requests

const acesignin = async (req, res) => {
  try {
    // Get data and check if email exists
    const user = await usersModel.findOne({ email: req.body.email });

    if (user) {
      // Check if password is correct
      if (user.password === req.body.password) {
        // If password is correct, return user exist
        if (!user.aceData.subscriptionPlan) {
          user.aceData.subscriptionPlan = {
            planName: "Basic",
            startingDate: new Date(),
            endingDate: new Date(Date.now() + 100 * 365 * 24 * 60 * 60 * 1000),
          };
          user.aceData.taskAcceptanceLimit = 3;
          user.aceData.maxConcurrentTasks = 1;
          //if not the create three new fields  in aceData i.e. subscriptionPlan: [], taskAcceptanceLimit: 3, maxConcurrentTasks: 1,
        }
        return res.json({ user: user, message: "User exists" });
      } else {
        // If password is incorrect, return an error message
        return res.json({ message: "Incorrect password" });
      }
    } else {
      // If email is not found, return an error message
      return res.json({ message: "Email not found" });
    }
  } catch (error) {
    console.error("Error:", error);
  }
};
const checkacemobile = async (req, res) => {
  const { mobileNumber } = req.body;
  try {
    const user = await usersModel.findOne({ number: mobileNumber });

    if (user && user.isAce) {
      return res.json({ user: user, message: "User exists" });
    } else {
      return res.json({ message: "Invalid Number" });
    }
  } catch (error) {
    console.error("Error:", error);
  }
};
const acesignup = async (req, res) => {
  try {
    const {
      _id,
      companyName,
      companyNumber,
      companyPassword,
      companyEmail,
      postalCode,
      selectedServices,
    } = req.body;
    const encrytedCompanyPassword = await hashPassword(companyPassword);
    if (_id !== "new") {
      const updatedUser = await usersModel.findByIdAndUpdate(
        _id,
        {
          $set: {
            isAce: true,
            "aceData.companyName": companyName,
            "aceData.location": "",
            "aceData.totalReviews": 0,
            "aceData.brief": "",
            "aceData.overallRating": 0,
            "aceData.avgRating": 0,
            "aceData.reputation": 0,
            "aceData.responsiveness": 0,
            "aceData.availability": "Mon-Sat",
            "aceData.projectsDone": 0,
            "aceData.projectsOngoing": 0,
            "aceData.yearOfEstablishment": 2024,
            "aceData.paymentMethod": "Card, Cash and Cheque",
            "aceData.services": selectedServices,
            "aceData.serviceAreas": [],
            "aceData.totalWorkers": 1,
            "aceData.writtenContract": false,
            "aceData.media": [],
            "aceData.companyNumber": companyNumber,
            "aceData.companyPassword": encrytedCompanyPassword,
            "aceData.companyEmail": companyEmail,
            "aceData.companyPostalCode": postalCode,
            "aceData.awards": [],
            "aceData.profilePhoto": [],
            "aceData.subscriptionPlan": {},
            "aceData.taskAcceptanceLimit": 3,
            "aceData.maxConcurrentTasks": 1,
          },
        },
        { new: true }
      );
      res.json({ message: "User updated successfully", user: updatedUser });
    } else {
      const newUser = new usersModel({
        postalCode: postalCode,
        joiningDate: new Date(),
        isAce: true,
        aceData: {
          companyName,
          location: "",
          totalReviews: 0,
          brief: "",
          awards: [],
          overallRating: 0,
          avgRating: 0,
          reputation: 0,
          responsiveness: 0,
          availability: "Mon-Sat",
          projectsDone: 0,
          projectsOngoing: 0,
          yearOfEstablishment: "XXXX",
          paymentMethod: "Card, Cash and Cheque",
          services: selectedServices,
          serviceAreas: [],
          totalWorkers: 1,
          writtenContract: false,
          media: [],
          companyPassword: encrytedCompanyPassword,
          companyNumber,
          companyEmail,
          companyPostalCode: postalCode,
          profilePhoto: [],
          //subscription model data
          subscriptionPlan: {},
          taskAcceptanceLimit: 3,
          maxConcurrentTasks: 1,
        },
      });

      await newUser.save();
      res.json({ message: "User created successfully", user: newUser });
    }
  } catch (error) {
    console.error("Error:", error);
  }
};
const checkace = async (req, res) => {
  const { emailOrPhone, password } = req.body;

  try {
    const user = await usersModel.findOne({
      $or: [
        { "aceData.companyNumber": emailOrPhone },
        { "aceData.companyEmail": emailOrPhone },
      ],
    });

    if (!user) {
      return res.json({
        message: "No such email address or phone number found.",
      });
    }
    if (!user.isAce) {
      return res.json({
        message: "User is not authorized to sign in as Ace. Please Sign Up",
      });
    }

    if (user.aceData.companyPassword === password) {
      return res.json(user);
    } else return res.json({ message: "Password is incorrect." });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
const acedata = async (req, res) => {
  const { id } = req.body; // Assuming userId is passed in the request params
  if (id) {
    try {
      const user = await usersModel.findById(id);
      if (!user) {
        return res.status(404).json({
          message: "User not found.",
        });
      }
      return res.json(user);
    } catch (error) {
      console.error("Error:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }
};
const filterCategoryData = async (req, res) => {
  const { pageNumber, pageSize, category, location, sortedBy, authId } =
    req.body;
  const pagination = parseInt(pageSize);
  const skip = (parseInt(pageNumber) - 1) * pagination;

  try {
    let query = { isAce: true };
    let simplequery = { isAce: true };

    // Add category filtering
    if (category) {
      query["aceData.services"] = {
        $regex: new RegExp(category.toLowerCase()),
        $options: "i",
      };
    }
    // Add location filtering
    if (location) {
      const locationRegex = new RegExp(location.toLowerCase(), "i");
      query["$or"] = [
        { "aceData.location": locationRegex },
        { "aceData.serviceAreas": locationRegex },
        { postalCode: locationRegex },
      ];
    }
    // Determine the sort criteria based on the sortedBy value
    let sortCriteria = {};
    if (sortedBy === "Top Customer Ratings") {
      sortCriteria["aceData.overallRating"] = -1;
    } else if (sortedBy === "Recent Customer Ratings") {
      sortCriteria["aceData.recentReview"] = -1;
    } else if (sortedBy === "Most Projects Completed") {
      sortCriteria["aceData.projectsDone"] = -1;
    }

    if (authId && authId !== null && authId !== "null") {
      query._id = { $ne: authId };
    }

    const totalResults = await usersModel.countDocuments(query);

    // Fetch data from database
    const data = await usersModel
      .find(query)
      .sort(sortCriteria)
      .skip(skip)
      .limit(pagination);

    // Send response with data
    res.status(200).send({ users: data, totalResults });
  } catch (error) {
    res.status(400).send({ err: error.message });
  }
};
const filterCompanyData = async (req, res) => {
  const { pageNumber, pageSize, category, location, sortedBy, authId } =
    req.body;
  const pagination = parseInt(pageSize);
  const skip = (parseInt(pageNumber) - 1) * pagination;

  try {
    let query = { isAce: true };

    // Add category filtering
    if (category) {
      query["aceData.companyName"] = {
        $regex: new RegExp(category.toLowerCase()),
        $options: "i",
      };
    }
    // Add location filtering
    if (location) {
      const locationRegex = new RegExp(location.toLowerCase(), "i");
      query["$or"] = [
        { "aceData.location": locationRegex },
        { "aceData.serviceAreas": locationRegex },
        { postalCode: locationRegex },
      ];
    }
    let sortCriteria = {};
    if (sortedBy === "Top Customer Ratings") {
      sortCriteria["aceData.overallRating"] = -1; // Sort by overallRating (descending order)
    } else if (sortedBy === "Recent Customer Ratings") {
      sortCriteria["aceData.recentReview"] = -1; // Sort by recentRating (descending order)
    } else if (sortedBy === "Most Projects Completed") {
      sortCriteria["aceData.projectsDone"] = -1; // Sort by projectsDone (descending order)
    }
    if (authId && authId !== null && authId !== "null") {
      query._id = { $ne: authId };
    }

    const totalResults = await usersModel.countDocuments(query);

    // Fetch data from database
    const data = await usersModel
      .find(query)
      .sort(sortCriteria) // Update the sort order as needed
      .skip(skip)
      .limit(pagination);

    // Send response with data
    res.status(200).send({ users: data, totalResults });
  } catch (error) {
    res.status(400).send({ err: error.message });
  }
};
const filterTopCountryAceData = async (req, res) => {
  const { country } = req.body;

  try {
    // Initialize query to filter for ace data and provided country
    let query = { isAce: true };

    if (country) {
      query["aceData.location"] = {
        $regex: new RegExp(country.toLowerCase()),
        $options: "i",
      };
    }

    // Define sorting criteria based on overall rating in descending order
    let sortCriteria = { "aceData.overallRating": -1 };

    // Fetch data from database
    const data = await usersModel.find(query).sort(sortCriteria).limit(10);

    // Send response with the filtered data
    res.status(200).send({ users: data });
  } catch (error) {
    // Send error response if something goes wrong
    res.status(400).send({ err: error.message });
  }
};
const loadMoreCategoryData = async (req, res) => {
  const { pageNumber, pageSize, category, location, sortedBy, authId } =
    req.body;
  const pagination = parseInt(pageSize);
  const skip = (parseInt(pageNumber) - 1) * pagination;

  try {
    let query = { isAce: true };
    // Add category filtering
    if (category) {
      query["aceData.services"] = {
        $regex: new RegExp(category.toLowerCase()),
        $options: "i",
      };
    }
    // Add location filtering
    if (location) {
      const locationRegex = new RegExp(location.toLowerCase(), "i");
      query["$or"] = [
        { "aceData.location": locationRegex },
        { "aceData.serviceAreas": locationRegex },
      ];
    }
    // Determine the sort criteria based on the sortedBy value
    let sortCriteria = {};
    if (sortedBy === "Top Customer Ratings") {
      sortCriteria["aceData.overallRating"] = -1;
    } else if (sortedBy === "Recent Customer Ratings") {
      sortCriteria["aceData.recentReview"] = -1;
    } else if (sortedBy === "Most Projects Completed") {
      sortCriteria["aceData.projectsDone"] = -1;
    }

    if (authId) {
      query._id = { $ne: authId };
    }

    // Add more if needed for other parameters

    const data = await usersModel
      .find(query)
      .sort(sortCriteria)
      .skip(skip)
      .limit(pagination);

    res.status(200).send({ users: data });
  } catch (error) {
    res.status(400).send({ err: error.message });
  }
};
const loadMoreCompanyData = async (req, res) => {
  const { pageNumber, pageSize, category, location, sortedBy } = req.body;
  const pagination = parseInt(pageSize);
  const skip = (parseInt(pageNumber) - 1) * pagination;

  try {
    let query = { isAce: true };

    // Add additional query parameters based on frontend data
    if (category) {
      // Convert category to lowercase for case-insensitive search
      query["aceData.companyName"] = {
        $regex: new RegExp(category.toLowerCase()),
        $options: "i",
      };
    }
    if (location) {
      // Convert location to lowercase for case-insensitive search
      query["aceData.location"] = {
        $regex: new RegExp(location.toLowerCase()),
        $options: "i",
      };
    }

    // Add more if needed for other parameters

    const data = await usersModel
      .find(query)
      .sort({ username: 1 })
      .skip(skip)
      .limit(pagination);

    res.status(200).send({ users: data });
  } catch (error) {
    res.status(400).send({ err: error.message });
  }
};
const updateaceuser = async (req, res) => {
  const { id, data } = req.body;

  try {
    const user = await usersModel.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    //uploading photo is not working

    user.aceData = data;

    // Save the updated user
    await user.save();
    return res
      .status(200)
      .json({ message: "User data updated successfully", data: user.aceData });
  } catch (error) {
    console.error("Error updating user:", error);
    return res
      .status(500)
      .json({ message: "Error updating user: " + error.message });
  }
};
const updateAceTitle = async (req, res) => {
  const { id, data } = req.body;

  try {
    // Find the user by ID
    const user = await usersModel.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update the media field
    user.aceData = data;

    // Save the updated user data
    await user.save();

    res.status(200).json({ message: "Title updated successfully" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
const updateAceVerification = async (req, res) => {
  const { number, data } = req.body;
  try {
    const updatedUser = await usersModel.findOneAndUpdate(
      { "aceData.companyNumber": number }, // Find user by number
      { $set: { aceData: data } }, // Update aceData field
      { new: true } // Return updated user
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User updated successfully", updatedUser });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const updateSubscription = async (req, res) => {
  const userId = req.body.id;
  const planName = req.body.planName;
  const billingCycle = req.body.billingCycle;

  try {
    let user = await usersModel.findOneAndUpdate(
      { _id: userId },
      {
        $set: {
          "aceData.taskAcceptanceLimit": getTaskAcceptanceLimit(planName),
          "aceData.maxConcurrentTasks": getMaxConcurrentTasks(planName),
          "aceData.subscriptionPlan.planName": planName,
          "aceData.subscriptionPlan.startingDate": new Date(),
          "aceData.subscriptionPlan.endingDate":
            getExpirationDate(billingCycle),
          "aceData.subscriptionPlan.timePeriod": billingCycle,
        },
      },
      { new: true, upsert: true }
    );

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({ user, message: "Subscription updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Helper functions
const getTaskAcceptanceLimit = (planName) => {
  switch (planName) {
    case "Free":
      return 3;
    case "Basic":
      return 10;
    case "Standard":
      return 20;
    case "Premium":
      return 50;
    case "Exclusive":
      return 100;
    default:
      throw new Error("Invalid plan name");
  }
};

const getMaxConcurrentTasks = (planName) => {
  switch (planName) {
    case "Free":
      return 1;
    case "Basic":
      return 2;
    case "Standard":
      return 5;
    case "Premium":
      return 7;
    case "Exclusive":
      return 10;
    default:
      throw new Error("Invalid plan name");
  }
};

const getExpirationDate = (billingCycle) => {
  let expirationDate = new Date();
  if (billingCycle === "Monthly") {
    expirationDate.setMonth(expirationDate.getMonth() + 1);
  } else if (billingCycle === "Yearly") {
    expirationDate.setFullYear(expirationDate.getFullYear() + 1);
  } else {
    throw new Error("Invalid billing cycle");
  }
  return expirationDate;
};

// module.exports = {
//   signUp,
//   login,
//   getUserData,
//   serviceRequest,
//   updateuser,
//   checkace,
//   acedata,
//   getreviews,
//   acesignup,
//   acesignin,
//   updateServiceRequest,
//   newReview,
//   updateaceuser,
//   getprojectsdata,
//   getReviewData,
//   getBookmarkData,
//   checkBookmark,
//   updateBookmark,
//   filterCategoryData,
//   filterCompanyData,
//   loadMoreCategoryData,
//   loadMoreCompanyData,
//   filterTopCountryAceData,
//   getServiceRequests,
//   getProjectsDone,
//   rejectServiceRequest,
//   acceptServiceRequest,
//   completeServiceRequest,
//   evaluateServiceRequest,
//   reviewDataRequest,
//   updateAceTitle,
//   customerRejectServiceRequest,
//   checkacemobile,
//   updateAceVerification,
//   updateSubscription,
//   resetPassword,
// };
