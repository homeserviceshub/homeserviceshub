import React, { useState } from "react";
import { Card } from "react-bootstrap";
import styles from "./index.module.css";
import { BsStarFill } from "react-icons/bs";

// const ReviewCardComponent = ({ photo, title, stars, date, description }) => {
const ReviewCardComponent = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const photo = "/icons/default-profile-picture-male-icon.svg";
  const title = "Bathroom Renovation";
  const stars = [1, 2, 3, 4, 5];
  const date = "7/10/2023";
  const description = `Agora Design Build expertly handled two renovations flawlessly. They completed both projects on time 
  and on budget. They provided excellent service and professional installers who were on-site on time, and were respectful 
  of our home. I intend to hire them again for future projects. I have told all family and friends of this company.This 
  company expertly handled two renovations flawlessly. They completed both projects on time and on budget. They provided 
  excellent service and professional installers who were on-site on time, and were respectful of our home. I intend to 
  hire them again for future projects. I have told all family and friends of this company.
  The final results exceeded our expectations and we absolutely love our updated main bath, ensuite, and basement powder 
  room. We loved working with the Agora Design Build team and look forward to our next project. We definitely recommend.`;
  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };
  return (
    <Card className={styles.dynamicCard}>
      <Card.Img src={photo} className={styles.cardImg} />
      <Card.Body className={styles.cardBody}>
        <Card.Title className={styles.cardTitle}>{title}</Card.Title>
        <Card.Text className={styles.stars}>
          {stars.map((item, index) => (
            <span key={index}>
              <BsStarFill fill="gold" />
            </span>
          ))}
        </Card.Text>
        <Card.Subtitle className="mb-2 text-muted">{date}</Card.Subtitle>
        <Card.Text className={styles.cardText}>
          {isExpanded ? description : `${description.slice(0, 315)}... `}
          <span
            className={styles.readMore}
            variant="link"
            onClick={toggleExpand}
          >
            {isExpanded ? " Read Less" : "Read More"}
          </span>
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default ReviewCardComponent;
