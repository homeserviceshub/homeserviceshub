import React, { useState } from "react";
import { Card } from "react-bootstrap";
import styles from "./index.module.css";
// import { BsStarFill } from "react-icons/bs";
import CustomButton from "../customBtn";

// const ReviewCardComponent = ({ photo, title, stars, date, description }) => {
const RequestReviewCardComponent = () => {
  // const [isExpanded, setIsExpanded] = useState(false);
  const [reviewed] = useState(false);

  const [requested, setRequested] = useState(false);

  const photo = "/icons/default-profile-picture-male-icon.svg";
  const name = "User Name";
  // const stars = [1, 2, 3, 4, 5];
  const date = "7/10/2023";

  return (
    <Card className={styles.dynamicCard}>
      <Card.Img src={photo} className={styles.cardImg} />
      <Card.Body className={styles.cardBody}>
        <Card.Title className={styles.cardTitle}>{name} </Card.Title>
        <Card.Text></Card.Text>
        <Card.Subtitle className="mb-2 text-muted">
          Project Done on {date}
        </Card.Subtitle>
        <Card.Subtitle className="mb-2 text-muted">
          Payment Mode Cash
        </Card.Subtitle>
      </Card.Body>
      <div className={styles.writeReview}>
        {reviewed ? (
          <button className={styles.requestedBtn}>Reviewed</button>
        ) : requested ? (
          <button className={styles.requestedBtn}>Requested a review</button>
        ) : (
          <CustomButton
            text={"Request a Review"}
            onClick={() => setRequested(true)}
          />
        )}
      </div>
    </Card>
  );
};

export default RequestReviewCardComponent;
