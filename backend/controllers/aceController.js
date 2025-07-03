const usersModel = require("../models/usersModel");
const { hashPassword, verifyPassword } = require("./utils");

const getExpirationDate = (billingCycle) => {
  const expirationDate = new Date();

  if (billingCycle === "3 Months") {
    expirationDate.setMonth(expirationDate.getMonth() + 3);
  } else if (billingCycle === "6 Months") {
    expirationDate.setMonth(expirationDate.getMonth() + 6);
  } else if (billingCycle === "12 Months") {
    expirationDate.setMonth(expirationDate.getMonth() + 12);
  } else {
    throw new Error("Invalid billing cycle");
  }
  expirationDate.setHours(23, 59, 59, 999);

  return expirationDate;
};

const acesignin = async (req, res) => {
  try {
    const { emailOrPhone, password } = req.body;

    if (!emailOrPhone || !password) {
      return res.status(400).json({
        success: false,
        message: "Email/phone and password are required",
      });
    }

    const user = await usersModel.findOne({
      $or: [
        { "aceData.companyEmail": emailOrPhone },
        { "aceData.companyNumber": emailOrPhone },
      ],
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User does not exist",
      });
    }

    const isPasswordValid = await verifyPassword(
      password,
      user.aceData.companyPassword
    );
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Incorrect password",
      });
    }

    if (!user.aceData.subscriptionPlan) {
      const start = new Date();
      const end = new Date();
      end.setMonth(end.getMonth() + 3);
      end.setHours(23, 59, 59, 999);
      user.aceData.subscriptionPlan = {
        planName: "Starter",
        duration: "3 Months",
        startingDate: start,
        endingDate: end,
      };
      // user.aceData.taskAcceptanceLimit = 3;
      // user.aceData.maxConcurrentTasks = 1;

      await user.save();
    }

    return res.status(200).json({
      success: true,
      message: "Sign-in successful",
      user: user,
    });
  } catch (error) {
    console.error("ACE Sign-in Error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

const checkacemobile = async (req, res) => {
  const { mobileNumber } = req.body;
  try {
    const user = await usersModel.findOne({
      "aceData.companyNumber": mobileNumber,
    });

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

    // Validate required fields
    if (
      !companyName ||
      !companyNumber ||
      !companyPassword ||
      !postalCode ||
      !selectedServices
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Missing required fields. Please provide company name, number, password, postal code, and services.",
      });
    }

    // Validate password length
    if (companyPassword.length < 8) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 8 characters long",
      });
    }

    // Validate phone number format (basic validation)
    if (!/^\d{10,15}$/.test(companyNumber)) {
      return res.status(400).json({
        success: false,
        message: "Invalid phone number format",
      });
    }

    // Check if companyNumber already exists in aceData.companyNumber
    const existingUserWithNumber = await usersModel.findOne({
      "aceData.companyNumber": companyNumber,
    });
    if (existingUserWithNumber) {
      return res.status(409).json({
        success: false,
        message: "An account with this phone number already exists",
      });
    }

    // Hash the password
    const encryptedCompanyPassword = await hashPassword(companyPassword);

    // Handle existing user update
    if (_id && _id !== "new") {
      const existingUser = await usersModel.findById(_id);

      if (!existingUser) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }

      // Check if user is already an ACE
      if (existingUser.isAce) {
        return res.status(400).json({
          success: false,
          message: "User is already registered as an ACE",
        });
      }

      const updatedUser = await usersModel.findByIdAndUpdate(
        _id,
        {
          $set: {
            isAce: true,
            postalCode: postalCode,
            "aceData.companyName": companyName,
            "aceData.location": "Amritsar, Punjab, India",
            "aceData.totalReviews": 0,
            "aceData.brief": "",
            "aceData.overallRating": 0,
            "aceData.avgRating": 0,
            "aceData.reputation": 0,
            "aceData.responsiveness": 0,
            "aceData.availability": "Mon-Sat",
            "aceData.projectsDone": 0,
            "aceData.projectsOngoing": 0,
            "aceData.yearOfEstablishment": new Date().getFullYear(),
            "aceData.paymentMethod": "Cash and Online",
            "aceData.services": selectedServices,
            "aceData.serviceAreas": ["Amritsar"],
            "aceData.totalWorkers": 1,
            "aceData.writtenContract": false,
            "aceData.media": [],
            "aceData.companyNumber": companyNumber,
            "aceData.companyPassword": encryptedCompanyPassword,
            "aceData.companyEmail": companyEmail || "",
            "aceData.companyPostalCode": postalCode,
            "aceData.awards": [],
            "aceData.profilePhoto": [],
            "aceData.subscriptionPlan": {
              planName: "Starter Listing",
              duration: "3 Months",
              startingDate: new Date(),
              endingDate: new Date(
                new Date().setMonth(new Date().getMonth() + 3)
              ),
            },
          },
        },
        { new: true }
      );

      return res.status(200).json({
        success: true,
        message: "User upgraded to ACE successfully",
        user: updatedUser,
      });
    }

    // Handle new user creation
    const newUser = new usersModel({
      postalCode: postalCode,
      joiningDate: new Date(),
      isAce: true,
      aceData: {
        companyName,
        location: "Amritsar, Punjab, India",
        totalReviews: 0,
        brief: "",
        overallRating: 0,
        avgRating: 0,
        reputation: 0,
        responsiveness: 0,
        availability: "Mon-Sat",
        projectsDone: 0,
        projectsOngoing: 0,
        yearOfEstablishment: new Date().getFullYear(),
        paymentMethod: "Cash and Online",
        services: selectedServices,
        serviceAreas: ["Amritsar"],
        totalWorkers: 1,
        writtenContract: false,
        media: [],
        companyPassword: encryptedCompanyPassword,
        companyNumber,
        companyEmail: companyEmail || "",
        companyPostalCode: postalCode,
        awards: [],
        profilePhoto: [],
        subscriptionPlan: {
          planName: "Starter Listing",
          duration: "3 Months",
          startingDate: new Date(),
          endingDate: new Date(new Date().setMonth(new Date().getMonth() + 3)),
        },
      },
    });

    await newUser.save();

    return res.status(201).json({
      success: true,
      message: "ACE account created successfully",
      user: newUser,
    });
  } catch (error) {
    console.error("ACE Signup Error:", error);

    // Handle duplicate key errors (e.g., duplicate email or phone number)
    if (error.code === 11000) {
      const field = Object.keys(error.keyPattern)[0];
      const message = `An account with this ${field} already exists`;
      return res.status(409).json({
        success: false,
        message: message,
      });
    }

    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

const checkace = async (req, res) => {
  const { emailOrPhone, password } = req.body;
  const encryptedPassword = await hashPassword(password);
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

    if (user.aceData.companyPassword === encryptedPassword) {
      return res.json(user);
    } else return res.json({ message: "Password is incorrect." });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const acedata = async (req, res) => {
  const { id } = req.body;
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

    if (category) {
      const sanitizeInput = (input) => {
        return input
          .replace(/([a-zA-Z])\(/g, "$1 (")
          .toLowerCase()
          .replace(/[()&]/g, "")
          .replace(/[^a-zA-Z0-9\s]/g, "")
          .split(/\s+/)
          .filter(Boolean);
      };

      const keywords = sanitizeInput(category);
      const regexPattern = keywords.map((k) => `(?=.*${k})`).join("") + ".*";

      query["aceData.services"] = {
        $regex: new RegExp(regexPattern, "i"),
      };
    }
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

    const data = await usersModel
      .find(query)
      .sort(sortCriteria)
      .skip(skip)
      .limit(pagination);

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

    if (category) {
      query["aceData.companyName"] = {
        $regex: new RegExp(category.toLowerCase()),
        $options: "i",
      };
    }
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

    const data = await usersModel
      .find(query)
      .sort(sortCriteria)
      .skip(skip)
      .limit(pagination);

    res.status(200).send({ users: data, totalResults });
  } catch (error) {
    res.status(400).send({ err: error.message });
  }
};

const filterTopCountryAceData = async (req, res) => {
  const { country } = req.body;

  try {
    let query = { isAce: true };

    if (country) {
      query["aceData.location"] = {
        $regex: new RegExp(country.toLowerCase()),
        $options: "i",
      };
    }

    let sortCriteria = { "aceData.overallRating": -1 };

    const data = await usersModel.find(query).sort(sortCriteria).limit(10);

    res.status(200).send({ users: data });
  } catch (error) {
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
    if (category) {
      query["aceData.services"] = {
        $regex: new RegExp(category.toLowerCase()),
        $options: "i",
      };
    }
    if (location) {
      const locationRegex = new RegExp(location.toLowerCase(), "i");
      query["$or"] = [
        { "aceData.location": locationRegex },
        { "aceData.serviceAreas": locationRegex },
      ];
    }
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

    if (category) {
      query["aceData.companyName"] = {
        $regex: new RegExp(category.toLowerCase()),
        $options: "i",
      };
    }
    if (location) {
      query["aceData.location"] = {
        $regex: new RegExp(location.toLowerCase()),
        $options: "i",
      };
    }

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

    user.aceData = data;
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
    const user = await usersModel.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.aceData = data;
    await user.save();
    res.status(200).json({ message: "Title updated successfully" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
const submitverificationrequest = async (req, res) => {
  const { id } = req.body;

  try {
    const user = await usersModel.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    await usersModel.updateOne(
      { _id: id },
      {
        $set: {
          "aceData.verificationRequest": true,
        },
      }
    );
    res.status(200).json({ message: "Request Submitted Successfully" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const updateAceVerification = async (req, res) => {
  const { number, data } = req.body;
  try {
    const updatedUser = await usersModel.findOneAndUpdate(
      { "aceData.companyNumber": number },
      { $set: { aceData: data } },
      { new: true }
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

// const getTaskAcceptanceLimit = (planName) => {
//   switch (planName) {
//     case "Free":
//       return 3;
//     case "Basic":
//       return 10;
//     case "Standard":
//       return 20;
//     case "Premium":
//       return 50;
//     case "Exclusive":
//       return 100;
//     default:
//       throw new Error("Invalid plan name");
//   }
// };

// const getMaxConcurrentTasks = (planName) => {
//   switch (planName) {
//     case "Free":
//       return 1;
//     case "Basic":
//       return 2;
//     case "Standard":
//       return 5;
//     case "Premium":
//       return 7;
//     case "Exclusive":
//       return 10;
//     default:
//       throw new Error("Invalid plan name");
//   }
// };

module.exports = {
  acesignin,
  checkacemobile,
  acesignup,
  checkace,
  acedata,
  filterCategoryData,
  filterCompanyData,
  filterTopCountryAceData,
  loadMoreCategoryData,
  loadMoreCompanyData,
  updateaceuser,
  updateAceTitle,
  updateAceVerification,
  updateSubscription,
  submitverificationrequest,
};
