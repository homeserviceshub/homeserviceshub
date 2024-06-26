const usersModel = require("../models/usersModel");

const usersData = async (req, res) => {
  try {
    let data = await usersModel.find();

    res
      .status(200)
      .send({ success: true, message: "All Data of Users", data: data });
  } catch (error) {
    res.status(400).send({ success: false, message: error.message });
  }
};

module.exports = { usersData };
