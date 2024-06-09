import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import styles from "./index.module.css";

const ContactUsComponent = () => {
  return (
    <Container>
      <Row className={styles.secondSection}>
        <Col lg={6} className={styles.photoOppositeDiv}>
          <div className={styles.oppositeDivHeading}>
            Always Here for You: Our Unwavering Commitment
          </div>
          <div className={styles.oppositeDivDescription}>
            We pride ourselves on being available to assist you whenever you
            need our support. In the unlikely event that we miss your inquiry,
            rest assured, we will promptly respond as soon as possible. Your
            satisfaction is our driving force, and we are dedicated to going the
            extra mile to exceed your expectations. Let us be your trusted
            partner in making your dreams a reality.
          </div>
        </Col>
        <Col
          lg={6}
          className={styles.familyPhoto}
          style={{
            background: `linear-gradient(
              45deg,
              rgba(0,0,0,0.5),
              rgba(0, 0, 0, 0.5)
              ),
              url("${process.env.PUBLIC_URL}/photos/familyphoto1.jpg")`,
          }}
        ></Col>
      </Row>
      <Row className={styles.secondSection}>
        <Col
          lg={6}
          className={styles.familyPhoto}
          style={{
            background: `linear-gradient(
              45deg,
              rgba(0,0,0,0.5),
              rgba(0, 0, 0, 0.5)
              ),
              url("${process.env.PUBLIC_URL}/photos/aceBackgroundPhoto.jpg")`,
          }}
        ></Col>
        <Col lg={6} className={styles.photoOppositeDiv}>
          <div className={styles.oppositeDivHeading}>
            Seamless Support for You
          </div>
          <div className={styles.oppositeDivDescription}>
            Contact us effortlessly via email at homeserviceshub@gmail.com, and
            experience our swift response and dedicated assistance. For
            immediate help, dial 98789-87898 to connect with our friendly team.
            At HomeservicesHub, we value your time and prioritize your
            satisfaction. Let us be your reliable point of contact
          </div>
        </Col>
      </Row>
      <Row className={styles.secondSection}>
        <Col lg={6} className={styles.photoOppositeDiv}>
          <div className={styles.oppositeDivHeading}>Ace's Support</div>
          <div className={styles.oppositeDivDescription}>
            If you are an Ace of our company, you can count on personalized
            assistance by reaching out to us at
            service.homeserviceshub@gmail.com. Your needs are our top priority,
            and we're delighted to offer you our expertise and support. For
            urgent matters, don't hesitate to give us a call directly at
            12345-45321. We're here to ensure that you receive swift and
            efficient solutions whenever you require them.
          </div>
        </Col>
        <Col
          lg={6}
          className={styles.familyPhoto}
          style={{
            background: `linear-gradient(
              45deg,
              rgba(0,0,0,0.5),
              rgba(0, 0, 0, 0.5)
              ),
              url("${process.env.PUBLIC_URL}/photos/aceBackgroundPhoto.jpg")`,
          }}
        ></Col>
      </Row>
    </Container>
  );
};

export default ContactUsComponent;
