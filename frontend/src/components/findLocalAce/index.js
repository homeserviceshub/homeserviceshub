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
        <Row className={styles.list}>
          <Col>
            <ul>
              <li data-aos="fade-up">
                {" "}
                Communicate one-on-one with qualified Ace's interested in your
                project.
              </li>
              <li data-aos="fade-up">
                Discuss all aspects of the project, including pricing and
                estimated timelines.
              </li>
              <li data-aos="fade-up">
                Confidently select the right expert for your project.
              </li>
              <li data-aos="fade-up">Receive the best price guaranteed</li>
            </ul>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default FindLocalAce;
