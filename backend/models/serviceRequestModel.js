const mongoose = require("mongoose");

const serviceRequestSchema = mongoose.Schema({
  customerID: String, //who requested the service
  clientID: String, //who gets serive request
  customerDetails: Object, //details that user has filled in the form(they maybe same or different of user table details)
  requestDate: Date, //automatically generate data when requeted
  responsiveness: String, //automatically generate data when requeted
  status: String,
  selectedService: String,
  accommodation: String, //home or building
  serviceNeed: String, //when customer needs service time flexible or within a month... etc
  discription: String, //detail that user added while filling the form
  price: String, // decided price
  otp: Number, // decided price
  completionDate: Date, // when task is competed then add its data and time
});

module.exports = mongoose.model("servicerequests", serviceRequestSchema); //serviceRequests is the collections name
