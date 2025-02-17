import React from "react";
import styles from "./index.module.css";
import { Button, Col, Container, Form, InputGroup, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedin,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";

const Footer = () => {
  const socialMedia = [
    {
      link: "https://www.facebook.com/",
      icon: <FaFacebookF className={styles.icon} />,
    },
    {
      link: "https://www.instagram.com/",
      icon: <FaInstagram className={styles.icon} />,
    },
    {
      link: "https://www.linkedin.com/",
      icon: <FaLinkedin className={styles.icon} />,
    },
    {
      link: "https://www.youtube.com/",
      icon: <FaYoutube className={styles.icon} />,
    },
    {
      link: "https://www.twitter.com/",
      icon: <FaTwitter className={styles.icon} />,
    },
  ];
  return (
    <div className={styles.footerArea}>
      <Container>
        <Row>
          <Col lg={3} md={6} sm={6}>
            <div>
              <h6 className={styles.footerTitle}>Company</h6>
              <Link to={"/aboutus"} className={styles.link}>
                About Us
              </Link>
              <Link to={"/contactus"} className={styles.link}>
                Contact Us
              </Link>
              <Link to={"/faq"} className={styles.link}>
                FAQ's
              </Link>
              <Link to={"/careers"} className={styles.link}>
                Careers
              </Link>
              {/* <Link to={"/aboutus"} className={styles.link}>
                Help
              </Link> */}
              {/* <Link to={"/aboutus"} className={styles.link}>
                Terms & Conditions
              </Link> */}
            </div>
          </Col>
          <Col lg={3} md={6} sm={6}>
            <div>
              <h6 className={styles.footerTitle}>Service Provider</h6>
              <Link to={"/ace"} className={styles.link}>
                Become a Provider
              </Link>
              <Link to={"/ace/signin"} className={styles.link}>
                Ace Login
              </Link>
              {/* <Link to={"/ace/terms"} className={styles.link}>
                Terms & Conditions
              </Link> */}
            </div>
          </Col>
          <Col lg={6} md={6} sm={6}>
            <div>
              <h6 className={styles.footerTitle}>Newsletter</h6>
              <p className={styles.footerPara}>
                {/* To get the latest news and offers join our newsletter and you
                can trust us we will never send you promo offers, not a single
                spam */}
                Unlock Exclusive Offers! Trust Us, No Annoying Promos, Just Pure
                Value!
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
            Copyright © 2025 | Homeserviceshub | All rights reserved
          </Col>
          <Col lg={4} md={4} className={styles.iconDiv}>
            {socialMedia.map((item, index) => {
              return (
                <Link
                  target="_blank"
                  rel="noopener noreferrer"
                  key={index}
                  to={item.link}
                  className={styles.outerIconDiv}
                >
                  {item.icon}
                </Link>
              );
            })}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Footer;
