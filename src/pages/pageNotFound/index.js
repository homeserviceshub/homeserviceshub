import React from "react";
import styles from "./index.module.css";
import { Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const PageNotFound = () => {
  const navigate = useNavigate();
  return (
    <div className={styles.outerDiv}>
      <Container>
        <Row className={styles.innerDiv}>
          <Col lg={12} className={styles.data1Div}>
            Oop's,
          </Col>
          <Col lg={12} className={styles.data2Div}>
            we couldn't find the page you're looking for. Please{" "}
            <span
              className={styles.span}
              onClick={() => {
                navigate("/");
              }}
            >
              Click Here
            </span>{" "}
            to return to the main page.
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default PageNotFound;
