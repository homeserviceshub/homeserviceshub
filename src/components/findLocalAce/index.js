import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import styles from "./index.module.css";

const FindLocalAce = () => {
  return (
    <div className={styles.containerX}>
      <Container>
        <h2 className={styles.mainHeading}>Find Ace's Near You</h2>
        <h5 className={styles.smallHeading}>
          Stop calling around. Home Makers sends Ace's straight to your inbox.
        </h5>
        <Row className={styles.list}>
          <Col>
            Chat directly with available pros interested in your project
          </Col>
        </Row>
        <Row className={styles.list}>
          <Col>Discuss project details, costs and timelines</Col>
        </Row>
        <Row className={styles.list}>
          <Col>Compare and hire with confidence</Col>
        </Row>
      </Container>
    </div>
  );
};

export default FindLocalAce;
