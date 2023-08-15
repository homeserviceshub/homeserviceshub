import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { BsStar, BsStarFill, BsStarHalf } from "react-icons/bs";
import styles from "./index.module.css";
import CustomButton from "../../components/customBtn";

const NewReview = () => {
  const [reviewData, setReviewData] = useState({
    title: "",
    description: "",
    stars: 0,
  });
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
    event.preventDefault();
    if (reviewData.stars === 0) {
      setCheckStars(true);
    }
    // Here, you can handle the submission of the review data to your backend or wherever you need to store it.
    console.log(reviewData);
  };

  return (
    <Container>
      <Row className={` ${styles.customMargin} justify-content-center`}>
        <Col md={8} lg={6} className={styles.heading}>
          Write a review to companyName
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
              <Row className={styles.starRow}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <Col
                    lg={1}
                    key={star}
                    className={styles.stars}
                    onClick={() => handleStarClick(star)}
                  >
                    {star <= reviewData.stars ? (
                      <BsStarFill fill="gold" />
                    ) : (
                      <BsStar fill="gold" />
                    )}
                  </Col>
                ))}
                {reviewData.stars === 0 && checkStars && (
                  <p style={{ color: "red" }}>Please rate first!</p>
                )}
              </Row>
            </Form.Group>
            <Form.Group controlId="submitButton" className={styles.btn}>
              <CustomButton
                type="submit"
                text={"submit Review"}
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
