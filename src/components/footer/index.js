import React from "react";
import styles from "./index.module.css";
import { Button, Col, Container, Form, InputGroup, Row } from "react-bootstrap";

const Footer = () => {
  return (
    <div className={styles.footerArea}>
      <Container>
        <Row>
          <Col lg={3} md={6} sm={6}>
            <div>
              <h6 className={styles.footerTitle}>About</h6>
              <p className={styles.footerPara}>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
                eiusmod tempor incididunt ut labore dolore magna aliqua.
              </p>
            </div>
          </Col>
          <Col lg={3} md={6} sm={6}>
            <div>
              <h6 className={styles.footerTitle}>Contact Us</h6>
              <p className={styles.footerPara}>
                you can connect with us through email and also ontact us by
                provided numbers below
              </p>
            </div>
            <a href="tel:8054875055" className={styles.numbers}>
              80548-75055
            </a>
            <a href="tel:8054875055" className={styles.numbers}>
              80548-75055
            </a>
          </Col>
          <Col lg={5} md={6} sm={6}>
            <div>
              <h6 className={styles.footerTitle}>Newsletter</h6>
              <p className={styles.footerPara}>
                You can trues use we eill never send you promo offers, not a
                single spam
              </p>
              <div>
                <Form>
                  <InputGroup>
                    <Form.Control placeholder="Enter Email" />
                    <Button variant="outline-secondary" id="button-addon2">
                      Submit
                    </Button>
                  </InputGroup>
                </Form>
              </div>
            </div>
          </Col>
        </Row>
        <Row className={styles.bottomDiv}>
          <Col lg={8} md={8} m={0} className={styles.footerPara}>
            Copyright © 2023 All rights reserved
          </Col>
          <Col lg={4} md={4}>
            {/* <a href="#">Facebook</a>
            <a href="#">Twiter</a>
            <a href="#">LinkedIn</a>
            <a href="#">Instagram</a> */}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Footer;
