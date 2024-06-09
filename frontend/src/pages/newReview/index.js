import React, { useState } from "react";
import { Col, Container, Form, Row, Spinner } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { BsStar, BsStarFill } from "react-icons/bs";
import styles from "./index.module.css";
import CustomButton from "../../components/customBtn";
import axios from "axios";

const NewReview = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [reviewData, setReviewData] = useState({
    title: "",
    description: "",
    stars: 0,
    reviewBy: localStorage.getItem("auth"),
    reviewTo: id,
    date: new Date().toISOString(),
  });
  const [isLoading, setIsLoading] = useState(false);
  const [checkStars, setCheckStars] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setReviewData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleStarClick = (selectedStars) => {
    setReviewData((prevState) => ({
      ...prevState,
      stars: selectedStars,
    }));
  };

  const handleSubmit = (event) => {
    setIsLoading(true);
    event.preventDefault();
    if (reviewData.stars !== 0 && reviewData.description && reviewData.title) {
      setCheckStars(true);
      try {
        axios
          .post("http://localhost:8000/newreview", {
            reviewData: reviewData,
          })
          .then((response) => {
            if (response.status === 200) {
              setIsLoading(false);
              alert("Your Review has been submitted successfully!!");
              navigate(-1);
            }
          });
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  return (
    <Container>
      <Row className={` ${styles.customMargin} justify-content-center`}>
        <Col md={8} lg={6} className={styles.heading}>
          Write a review
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="reviewTitle" className={styles.customMargin}>
              <Form.Label>Review Title</Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={reviewData.title}
                onChange={handleInputChange}
                placeholder="Enter review title"
                required
              />
            </Form.Group>

            <Form.Group
              controlId="reviewDescription"
              className={styles.customMargin}
            >
              <Form.Label>Review Description</Form.Label>
              <Form.Control
                as="textarea"
                name="description"
                value={reviewData.description}
                onChange={handleInputChange}
                placeholder="Enter review description"
                required
              />
            </Form.Group>

            <Form.Group controlId="reviewStars" className={styles.customMargin}>
              <Form.Label>Rating</Form.Label>
              <div className={styles.starRow}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <div
                    key={star}
                    className={styles.stars}
                    onClick={() => handleStarClick(star)}
                  >
                    {star <= reviewData.stars ? (
                      <BsStarFill fill="gold" />
                    ) : (
                      <BsStar fill="gold" />
                    )}
                  </div>
                ))}
                {reviewData.stars === 0 && checkStars && (
                  <p style={{ color: "red" }}>Please rate first!</p>
                )}
              </div>
            </Form.Group>
            <Form.Group controlId="submitButton" className={styles.btn}>
              <CustomButton
                type="submit"
                text={
                  isLoading ? (
                    <Spinner
                      animation="border"
                      className={styles.signInLoader}
                    />
                  ) : (
                    "Submit Review"
                  )
                }
                width={"auto"}
              />
            </Form.Group>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default NewReview;
