const reviewsModel = require("../models/reviewsModel");
const usersModel = require("../models/usersModel");

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

    const allReviews = await reviewsModel.find({
      reviewTo: reviewData.reviewTo,
    });
    const clientData = await usersModel.findById(reviewData.reviewTo);

    let totalStars = 0;
    allReviews.forEach((review) => {
      totalStars += Math.min(review.stars, 5);
    });
    const numberOfReviews = allReviews.length;
    const averageRating =
      numberOfReviews === 0 ? 0 : totalStars / numberOfReviews;

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

const getreviews = async (req, res) => {
  const { id } = req.body;

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

const reviewDataRequest = async (req, res) => {
  let { id } = req.body;

  try {
    if (!Array.isArray(id)) {
      id = [id];
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

module.exports = {
  newReview,
  getReviewData,
  getreviews,
  reviewDataRequest,
};
