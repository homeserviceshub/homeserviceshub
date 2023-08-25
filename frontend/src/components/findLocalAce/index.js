import React, { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import styles from "./index.module.css";
import AOS from "aos";

const FindLocalAce = () => {
  useEffect(() => {
    AOS.init();
  }, []);
  return (
    <div className={styles.containerX}>
      <Container>
        <h2 data-aos="fade-up" className={styles.mainHeading}>
          Find Ace's Near You
        </h2>
        <h5 data-aos="fade-up" className={styles.smallHeading}>
          Stop calling around. Home Makers sends Ace's straight to your inbox.
        </h5>
        <Row data-aos="fade-up" className={styles.list}>
          <Col>
            Communicate one-on-one with qualified Ace's interested in your
            project.
          </Col>
        </Row>
        <Row data-aos="fade-up" className={styles.list}>
          <Col>
            Discuss all aspects of the project, including pricing and estimated
            timelines.
          </Col>
        </Row>
        <Row data-aos="fade-up" className={styles.list}>
          <Col>Confidently select the right expert for your project.</Col>
        </Row>
      </Container>
    </div>
  );
};

export default FindLocalAce;
