const serviceRequestModel = require("../models/serviceRequestModel");
const usersModel = require("../models/usersModel");
const { sendEmail } = require("./utils");

const serviceRequest = async (req, res) => {
  try {
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
      requestDate,
      status: "pending",
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
    sendEmail(customerData.email, "Request Successful", newRequestMsgCustomer);
    res.status(200).send({
      success: true,
      message: "New Service Request Created",
      data: doc,
    });
  } catch (error) {
    res.status(400).send({ success: false, message: error.message });
  }
};

const updateServiceRequest = async (req, res) => {
  const requestId = req.body.requestId;
  try {
    const request = await serviceRequestModel.findById(requestId);
    if (request) {
      Object.assign(request, req.body);
      await request.save();
      res.status(200).json({ message: "Service request updated successfully" });
    } else {
      res.status(404).json({ message: "Service request not found" });
    }
  } catch (error) {
    res.status(400).send({ success: false, message: error.message });
  }
};

const acceptServiceRequest = async (req, res) => {
  const { id, price } = req.body;
  try {
    const request = await serviceRequestModel.findOne({ _id: id });
    const updatedRequest = await serviceRequestModel.findByIdAndUpdate(
      id,
      { status: "accepted", price: price },
      { new: true }
    );
    if (!updatedRequest) {
      return res.status(404).json({ message: "Service request not found" });
    }

    const updatedUser = await usersModel.findByIdAndUpdate(
      updatedRequest.clientID,
      {
        $inc: { "aceData.projectsOngoing": 1 },
      }
    );
    const acceptedEmail = `
    <p>Dear Customer,</p>
    <p>We're pleased to inform you that your service request for ${request.selectedService} has been accepted by ${updatedUser.aceData.companyName}.</p>
    <p>Thank you for choosing us.</p>
    <p>Best regards,<br>Home Services Hub</p>
  `;
    sendEmail(
      request.customerDetails.email,
      "Service Request Accepted Successfully",
      acceptedEmail
    );
    res
      .status(200)
      .json({ message: "Service request accepted", updatedRequest });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const completeServiceRequest = async (req, res) => {
  const { id, paymentMethod } = req.body;
  try {
    const request = await serviceRequestModel.findById(id);

    if (!request) {
      return res.status(404).json({ message: "Service request not found" });
    }

    const updatedRequest = await serviceRequestModel.findByIdAndUpdate(
      id,
      {
        status: "completed",
        completionDate: new Date(),
        paymentMethod: paymentMethod,
      },
      { new: true }
    );
    await usersModel.findByIdAndUpdate(
      updatedRequest.clientID,
      {
        $inc: {
          "aceData.projectsDone": 1,
          "aceData.projectsOngoing": -1,
        },
        $set: {
          "aceData.lastTaskCompleted": new Date(),
        },
      },
      { new: true }
    );

    const user = await usersModel.findById(updatedRequest.clientID);
    const totalProjectsDone = user.aceData.projectsDone;
    const avgRating = user.aceData.avgRating;
    const responsiveness = user.aceData.responsiveness;

    const totalRequests = await serviceRequestModel.countDocuments({
      clientID: updatedRequest.clientID,
    });
    const reputation = (totalProjectsDone / totalRequests) * 5;
    const overall = (reputation + avgRating + responsiveness) / 3;

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
    if (request.customerDetails.email) {
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
    const request = await serviceRequestModel.findByIdAndUpdate(
      id,
      { status: "cancelled" },
      { new: true }
    );

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
    if (request.customerDetails.email) {
      sendEmail(
        request.customerDetails.email,
        "Your Service Request has been Rejected",
        rejectedEmail
      );
    }

    res.status(200).json({ message: "Service request rejected", request });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const customerRejectServiceRequest = async (req, res) => {
  const { id, reason } = req.body;

  try {
    const request = await serviceRequestModel.findByIdAndUpdate(
      id,
      { status: "cancelled", customerRejectedReason: reason },
      { new: true }
    );

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
    if (request.customerDetails.email) {
      sendEmail(
        request.customerDetails.email,
        "Your Service Request has been Rejected",
        rejectedEmail
      );
    }

    res.status(200).json({ message: "Service request rejected", request });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
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
    res.status(500).json({ message: "Internal Server Error" });
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
          },
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

module.exports = {
  serviceRequest,
  updateServiceRequest,
  acceptServiceRequest,
  completeServiceRequest,
  rejectServiceRequest,
  customerRejectServiceRequest,
  getServiceRequests,
  getprojectsdata,
  getProjectsDone,
};
