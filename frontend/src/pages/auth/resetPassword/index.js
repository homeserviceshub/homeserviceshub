import styles from "./ResetPassword.module.css";
import React from "react";
import { Form, Container, Row, Col, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function ResetPasword() {
  const navigate = useNavigate();

  function gotoSignIn() {
    navigate("/", {
      replace: true,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
  }
  return (
    <Container fluid className={styles.containerX}>
      <Row className=" justify-content-center align-items-center h-100">
        <Col md={4} className={` p-5 ${styles.containerY}`}>
          <div className="text-center">
            <img src="/img/logo.png" alt="logox" />
          </div>
          <Form onSubmit={handleSubmit} className={styles.formDesign}>
            <Container className="p-0">
              <Row className="py-3 justify-content-center">
                <Col md={12}>
                  <h2>Reset Password</h2>
                </Col>
                <Col md={12} className={styles.formText}>
                  <div>
                    Enter the mail associated with your account and we’ll send
                    an email with instruction to reset your password
                  </div>
                </Col>
                <Col md={12}>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Email Address"
                  />
                </Col>

                <Col md={12} className="text-center">
                  {/* <button className="btn w-100">Sign In</button> */}

                  <Button
                    type="submit"
                    onClick={gotoSignIn}
                    className={styles.signInLink}
                  >
                    Send Mail
                  </Button>
                </Col>
              </Row>
            </Container>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}
export default ResetPasword;
