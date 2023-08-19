import React, { useState } from "react";
import styles from "./index.module.css";
import { Container, Row, Col } from "react-bootstrap";
import { Link as ScrollLink } from "react-scroll";
import ReviewCardComponent from "../../../components/reviewCard";
import RequestReviewCardComponent from "../../../components/reviewCard/requestReviewCardComponent";

const AceReviews = () => {
  const [selectedFilter, setSelectedFilter] = useState("all");
  const stars = ["1", "2", "3", "4", "5"];
  const activeTab = (e) => {
    setSelectedFilter(e.target.title);
  };
  return (
    <div className={styles.customContainer}>
      <div className={styles.backGround}>
        <Container className={`${styles.containerY}`}>
          <div className={`${styles.tabs} ${styles.borderX} `}>
            <ScrollLink to="all" smooth={true} duration={500} offset={-150}>
              <div
                title="all"
                onClick={activeTab}
                lg={1}
                className={`${styles.tab} ${
                  selectedFilter === "all" ? styles.activeTab : ""
                }`}
              >
                All Reviews
              </div>
            </ScrollLink>

            <ScrollLink
              to="projectdone"
              smooth={true}
              duration={500}
              offset={-150}
            >
              <div
                title="projectdone"
                onClick={activeTab}
                lg={1}
                className={`${styles.tab} ${
                  selectedFilter === "projectdone" ? styles.activeTab : ""
                }`}
              >
                Projects Done
              </div>
            </ScrollLink>
          </div>
        </Container>
      </div>

      <Container className={styles.containerX}>
        <Row id="all">
          <Col lg={12} className={styles.reviewHeading}>
            <div>Reviews(5)</div>
          </Col>
          {stars.map((item, index) => {
            return <ReviewCardComponent key={index} />;
          })}
        </Row>
        <Row id="projectdone">
          <Col lg={12} className={styles.reviewHeading}>
            <div>Projects done(5)</div>
          </Col>
          {stars.map((item, index) => {
            return <RequestReviewCardComponent key={index} />;
          })}
        </Row>
      </Container>
    </div>
  );
};

export default AceReviews;
