const nodemailer = require("nodemailer");
const cron = require("node-cron");
const argon2 = require("argon2");
const usersModel = require("../models/usersModel");

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
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

// Commented out as OTP is no longer needed
// const generateOTP = () => {
//   const otp = Math.floor(100000 + Math.random() * 900000);
//   return otp;
// };

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
      user.aceData.subscriptionPlan.expirationDate = null;

      await user.save();

      console.log(`Reset subscription for user ${user._id}`);
    }
  } catch (error) {
    console.error("Error resetting subscriptions:", error);
  }
});

module.exports = {
  hashPassword,
  verifyPassword,
  sendEmail,
};
