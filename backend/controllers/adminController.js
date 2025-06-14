const User = require("../models/usersModel");
const ServiceRequest = require("../models/serviceRequestModel");
const Review = require("../models/reviewsModel");

const getUserData = async (req, res) => {
  const { _Id } = req.body;
  var data = "";
  try {
    const user = await User.findOne({ _id: _Id });
    if (user && user.isAdmin) {
      data = user;
    }
    // Send response with data
    res.status(200).send({ user: data });
  } catch (error) {
    res.status(400).send({ err: error.message });
  }
};

const getServiceRequests = async (req, res) => {
  try {
    const requests = await ServiceRequest.aggregate([
      {
        $addFields: {
          clientObjectId: { $toObjectId: "$clientID" },
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "clientObjectId",
          foreignField: "_id",
          as: "clientData",
        },
      },
      {
        $unwind: {
          path: "$clientData",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $addFields: {
          customerObjectId: {
            $cond: [
              { $ne: ["$customerID", "Direct"] },
              { $toObjectId: "$customerID" },
              null,
            ],
          },
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "customerObjectId",
          foreignField: "_id",
          as: "customerData",
        },
      },
      {
        $unwind: {
          path: "$customerData",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $project: {
          fullRequest: "$$ROOT",
          clientData: {
            companyName: "$clientData.aceData.companyName",
            companyNumber: "$clientData.aceData.companyNumber",
            companyEmail: "$clientData.aceData.companyEmail",
          },
          customerData: {
            $cond: [
              { $ne: ["$customerID", "Direct"] },
              {
                customerEmail: "$customerData.email",
                customerName: "$customerData.username",
                customerNumber: "$customerData.number",
              },
              null,
            ],
          },
        },
      },
      {
        $replaceRoot: {
          newRoot: {
            $mergeObjects: [
              "$fullRequest",
              {
                clientData: "$clientData",
                customerData: "$customerData",
              },
            ],
          },
        },
      },
    ]);

    res.status(200).json(requests);
  } catch (error) {
    console.error("Error fetching combined data:", error);
    res.status(500).json({ error: "Failed to fetch combined data" });
  }
};

const getCustomers = async (req, res) => {
  try {
    const customers = await User.find({ isAdmin: false }).select(
      "_id name email"
    );
    res.status(200).json(customers);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch customers" });
  }
};

const getClients = async (req, res) => {
  try {
    const clients = await User.find({ isAdmin: false, isAce: true }).select(
      "_id name email"
    );
    res.status(200).json(clients);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch clients" });
  }
};

const getReviews = async (req, res) => {
  try {
    const reviews = await Review.find().select("_id userId rating comment");
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch reviews" });
  }
};

const getSubscriptions = async (req, res) => {
  try {
    // Placeholder: No subscription model exists
    res.status(200).json({ message: "Subscriptions not implemented yet" });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch subscriptions" });
  }
};

const updateServiceRequest = async (req, res) => {
  try {
    const { _id, status, cancelledBy } = req.body;

    let updateFields = { status };

    // ACCEPTED
    if (status === "accepted") {
      try {
        const request = await ServiceRequest.findById(_id);
        if (!request) {
          return res.status(404).json({ message: "Service request not found" });
        }

        const client = await User.findById(request.clientID);

        // Calculate evaluation time in minutes
        const acceptedDate = Date.now();
        const requestDate = new Date(
          client.aceData?.lastTaskCompleted
            ? client.aceData.lastTaskCompleted
            : request.requestDate
        ).getTime();
        const evaluationTime = (acceptedDate - requestDate) / (1000 * 60); // in minutes

        // Calculate responsiveness rating based on evaluation time
        let responsivenessRating = 0;
        if (evaluationTime <= 5) {
          responsivenessRating = 5;
        } else if (evaluationTime <= 15) {
          responsivenessRating = 4;
        } else if (evaluationTime <= 60) {
          responsivenessRating = 3;
        } else if (evaluationTime <= 120) {
          responsivenessRating = 2;
        } else {
          responsivenessRating = 1;
        }

        // Update the request with accepted status and responsiveness rating
        const updatedRequest = await ServiceRequest.findByIdAndUpdate(
          _id,
          {
            status: "accepted",
            responsiveness: responsivenessRating,
          },
          { new: true }
        );

        // Increment ongoing projects
        await User.findByIdAndUpdate(
          updatedRequest.clientID,
          {
            $inc: {
              "aceData.projectsOngoing": 1,
            },
          },
          { new: true }
        );

        // Calculate average responsiveness rating across all requests of this user
        const clientProjects = await ServiceRequest.find({
          clientID: updatedRequest.clientID,
        });

        let totalResponsivenessRating = 0;
        let ratedProjects = 0;

        clientProjects.forEach((project) => {
          const rating = +project.responsiveness;
          if (!isNaN(rating)) {
            totalResponsivenessRating += rating;
            ratedProjects++;
          }
        });

        const averageResponsiveness =
          ratedProjects > 0 ? totalResponsivenessRating / ratedProjects : 0;

        const updatedUser = await User.findByIdAndUpdate(
          updatedRequest.clientID,
          {
            "aceData.responsiveness": averageResponsiveness,
          },
          { new: true }
        );

        return res.status(200).json({
          message: "Service request accepted and evaluated",
          updatedRequest,
        });
      } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({ message: "Internal Server Error" });
      }
    }

    // REJECTED BY SERVICE PROVIDER
    else if (status === "cancelled" && cancelledBy === "client") {
      const updatedRequest = await ServiceRequest.findByIdAndUpdate(
        _id,
        updateFields,
        { new: true }
      );
      return res
        .status(200)
        .json({ message: "Service request rejected", updatedRequest });
    }

    // CANCELLED BY CUSTOMER
    else if (status === "cancelled" && cancelledBy === "customer") {
      updateFields.cancelledBy = cancelledBy;

      const updatedRequest = await ServiceRequest.findByIdAndUpdate(
        _id,
        updateFields,
        { new: true }
      );
      return res.status(200).json({
        message: "Service request cancelled by customer",
        updatedRequest,
      });
    }

    // DEFAULT UPDATE IF NONE MATCHED
    const updatedRequest = await ServiceRequest.findByIdAndUpdate(
      _id,
      updateFields,
      { new: true }
    );

    return res
      .status(200)
      .json({ message: "Service request updated", updatedRequest });
  } catch (error) {
    console.error("Error updating service request:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const getServiceProviders = async (req, res) => {
  try {
    let data = await User.find({ isAce: true });

    res
      .status(200)
      .send({ success: true, message: "All Service Providers", data: data });
  } catch (error) {
    res.status(400).send({ success: false, message: error.message });
  }
};

const createServiceRequest = async (req, res) => {
  try {
    const requestDate = new Date();
    let newRequest = new ServiceRequest({
      customerID: "Direct",
      clientID: req.body.aceData._id,
      customerDetails: {
        name: req.body.customerName,
        email: req.body.customerEmail,
        address: req.body.customerAddress,
        number: req.body.customerNumber,
      },
      requestDate,
      status: "requested",
      selectedService: req.body.selectedService,
      accommodation: req.body.accommodation,
      serviceNeed: req.body.serviceNeed,
      selectedArea: req.body.selectedArea,
      discription: req.body.discription,
    });
    const doc = await newRequest.save();
    res.status(200).send({
      success: true,
      message: "New Service Request Created",
      data: doc,
    });
  } catch (error) {
    res.status(400).send({ success: false, message: error.message });
  }
};
const verificationrequests = async (req, res) => {
  try {
    const data = await User.find({
      "aceData.verificationRequest": true,
    });

    res.status(200).send({ data: data });
  } catch (error) {
    res.status(400).send({ success: false, message: error.message });
  }
};
const verificationrequestsdone = async (req, res) => {
  const { id } = req.body;

  try {
    const user = await User.findById(id);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    await User.updateOne(
      { _id: id },
      { $set: { "aceData.verificationRequest": false } }
    );

    const data = await User.find({ "aceData.verificationRequest": true });

    res.status(200).send({ data });
  } catch (error) {
    res.status(400).send({ success: false, message: error.message });
  }
};

module.exports = {
  getUserData,
  getServiceRequests,
  getCustomers,
  getClients,
  getReviews,
  getSubscriptions,
  updateServiceRequest,
  getServiceProviders,
  createServiceRequest,
  verificationrequests,
  verificationrequestsdone,
};
