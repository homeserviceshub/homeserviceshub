import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import styles from "./index.module.css";
import { BsStar, BsStarFill } from "react-icons/bs";
import AOS from "aos";
import moment from "moment";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const ReviewCardComponent = ({ data, photosOf }) => {
  const navigate = useNavigate();
  const [isExpanded, setIsExpanded] = useState(false);
  const [reviewTo, setReviewTo] = useState([]);
  const [reviewBy, setReviewBy] = useState([]);
  const dispatch = useDispatch();
  const photo = "/icons/default-profile-picture-male-icon.svg";

  const reviewByUserIds = [...new Set(data.map((item) => item.reviewBy))];
  const reviewToUserIds = [...new Set(data.map((item) => item.reviewTo))];

  useEffect(() => {
    const getReviewsData = async () => {
      try {
        const [reviewToResponse, reviewByResponse] = await Promise.all([
          axios.post("/api/reviewdatarequest", {
            id: reviewToUserIds,
          }),
          axios.post("/api/reviewdatarequest", {
            id: reviewByUserIds,
          }),
        ]);

        if (reviewToResponse.status === 200) {
          setReviewTo(reviewToResponse.data);
        }

        if (reviewByResponse.status === 200) {
          setReviewBy(reviewByResponse.data);
        }
      } catch (error) {
        console.error("AxiosError:", error);
      }
    };

    AOS.init();
    getReviewsData();
  }, []);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <>
      {data
        .sort((a, b) => new Date(b.reviewDate) - new Date(a.reviewDate))
        .map((reviewData, index) => (
          <Card key={index} className={styles.dynamicCard} data-aos="fade-up">
            <div className={styles.upperColumn}>
              {photosOf === "reviewer" ? (
                <Card.Img
                  src={
                    reviewBy.find((item) => item._id === reviewData.reviewBy)
                      ?.profile_photo
                      ? `/images/${
                          reviewBy.find(
                            (item) => item._id === reviewData.reviewBy
                          )?.profile_photo?.path
                        }`
                      : process.env.PUBLIC_URL + photo
                  }
                  className={styles.cardImg}
                />
              ) : (
                <Card.Img
                  src={
                    reviewTo.find((item) => item._id === reviewData.reviewTo)
                      ?.aceData?.profilePhoto
                      ? `/images/${
                          reviewTo.find(
                            (item) => item._id === reviewData.reviewTo
                          )?.aceData?.profilePhoto?.path
                        }`
                      : process.env.PUBLIC_URL + photo
                  }
                  className={styles.cardImg}
                  onClick={() =>
                    navigate(
                      `/companyprofile/${
                        reviewTo.find(
                          (item) => item._id === reviewData.reviewTo
                        )._id
                      }`
                    )
                  }
                />
              )}

              <Card.Body className={styles.cardBody}>
                <Card.Title
                  className={styles.cardTitle}
                  onClick={() =>
                    photosOf === "reviewer"
                      ? ""
                      : navigate(
                          `/companyprofile/${
                            reviewTo.find(
                              (item) => item._id === reviewData.reviewTo
                            )._id
                          }`
                        )
                  }
                >
                  {reviewData.reviewTitle
                    ? reviewData.reviewTitle
                    : "Dummy Title"}
                </Card.Title>
                <Card.Text className={styles.stars}>
                  {[...Array(5)].map((_, index) => (
                    <span key={index}>
                      {index < Number(reviewData?.stars) ? (
                        <BsStarFill fill="gold" />
                      ) : (
                        <BsStar fill="gold" />
                      )}
                    </span>
                  ))}
                </Card.Text>
                <div>
                  <Card.Subtitle className="mb-2 text-muted">
                    {moment(reviewData?.reviewDate).format(
                      "MMMM Do YYYY, h:mm:ss a"
                    )}
                  </Card.Subtitle>
                </div>
                <Card.Text className={styles.cardText}>
                  {reviewData?.reviewDescription.length <= 310 || isExpanded
                    ? reviewData?.reviewDescription
                    : `${reviewData?.reviewDescription.slice(0, 310)}... `}
                  {reviewData?.reviewDescription.length > 310 && (
                    <span
                      className={styles.readMore}
                      variant="link"
                      onClick={toggleExpand}
                    >
                      {isExpanded ? " Read Less" : "Read More"}
                    </span>
                  )}
                </Card.Text>
              </Card.Body>
            </div>
          </Card>
        ))}
    </>
  );
};

export default ReviewCardComponent;
