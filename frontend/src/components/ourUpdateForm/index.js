import React from "react";
import { Form, Container, Row, Col } from "react-bootstrap";
import styles from "./index.module.css";
import CustomButton from "../customBtn";

const OurUpdateForm = () => {
  return (
    <div>
      <Container>
        <Row>
          <Col className={styles.mainHeading}>Need Help</Col>
        </Row>
      </Container>
      <Container className={styles.main}>
        <Row>
          <Col className={styles.heading}>Get in touch with us</Col>
        </Row>
        <Form>
          <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Label>Full Name</Form.Label>
            <Form.Control type="text" placeholder="Enter Fullname" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicMessage">
            <Form.Label>Message</Form.Label>
            <Form.Control
              as="textarea"
              aria-label="With textarea"
              placeholder="Enter your message"
              rows={5}
            />
          </Form.Group>
          <Form.Group className={styles.button}>
            <CustomButton text={"Notify Me"} />
          </Form.Group>
        </Form>
      </Container>
    </div>
  );
};

export default OurUpdateForm;
