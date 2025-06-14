const mongoose = require("mongoose");

const serviceRequestSchema = mongoose.Schema({
  customerID: String,
  clientID: String,
  customerDetails: Object,
  requestDate: Date,
  responsiveness: String,
  status: String,
  selectedService: String,
  accommodation: String, //home or building
  serviceNeed: String,
  discription: String,
  paymentMethod: String,
  otp: Number,
  completionDate: Date,
  cancelledBy: String,
  customerRejectedReason: String,
  clientRejectedReason: String,
  requestedOn: String,
});

module.exports = mongoose.model("servicerequests", serviceRequestSchema);
