const usersModel = require("../models/usersModel");
const bookmarksModel = require("../models/bookmarkModel");
const { hashPassword, verifyPassword, sendEmail } = require("./utils");
const jwt = require("jsonwebtoken");

const signUp = async (req, res) => {
  try {
    const existingUser = await usersModel.findOne({
      $or: [{ email: req.body.email }, { number: req.body.number }],
    });

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

    const encrytedPassword = await hashPassword(req.body.password);
    const newUser = new usersModel({
      username: req.body.username,
      email: req.body.email,
      password: encrytedPassword,
      number: req.body.number,
      joiningDate: new Date(),
    });
    const doc = await newUser.save();
    res.status(200).send({
      success: true,
      message: "New user created successfully.",
      data: doc,
    });
  } catch (error) {
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
      await bookmarksModel.deleteOne({
        customerID: req.body.customerID,
        clientID: req.body.clientID,
      });
      res.json({ message: "Bookmark removed successfully" });
    } else {
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
  const { id, profile_photo, ...otherFields } = req.body;

  try {
    const User = await usersModel.findById(id);
    if (!User) {
      return res.status(404).json({ message: "User not found" });
    }

    let updateMade = false;

    // Only update profile photo if it was provided
    if (profile_photo) {
      User.profile_photo = profile_photo;
      updateMade = true;
    }

    // Check if any other fields need updating
    const fieldsToUpdate = Object.keys(otherFields);
    if (fieldsToUpdate.length > 0) {
      Object.assign(User, otherFields);
      updateMade = true;
    }

    if (!updateMade) {
      return res.status(200).json({ message: "No fields need updating" });
    }

    await User.save();
    return res.status(200).json({
      message: "User updated successfully",
      data: User,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
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

    const token = jwt.sign({ id, email }, process.env.EDITOR, {
      expiresIn: "15m",
    });

    const resetLink = `http://localhost:3000/reset-password?token=${token}`;
    const emailContent = `
    <p>Dear User,</p>
    <p>We received a request to reset your password. Click the link below to reset your password. This link is valid for <b>15 minutes</b>.</p>
    <p><a href="${resetLink}" target="_blank" style="color: blue; font-weight: bold;">Reset Your Password</a></p>
    <p>If you did not request this, please ignore this email. Your password will remain unchanged.</p>
    <br/>
    <p>Best Regards,</p>
    <p>Your Company Name</p>
  `;
    sendEmail(email, "Password Reset Request", emailContent);

    res
      .status(200)
      .json({ message: "Password reset email sent successfully." });
  } catch (error) {
    console.error("Error in resetPassword:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  signUp,
  login,
  checkBookmark,
  getBookmarkData,
  updateBookmark,
  getUserData,
  updateuser,
  resetPassword,
};
