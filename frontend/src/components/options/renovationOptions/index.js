import React from "react";
import { Col, Container, Dropdown, Row } from "react-bootstrap";
import styles from "./index.module.css";
// import ScreenSlider from "../screenslider";

const RenovationOptions = () => {
  return (
    <Container>
      <div className={styles.categoryDiv}>
        <div className={styles.howcanwehelp}> Our Offered Services</div>
        <div className={styles.dropdown}>
          {/* <Dropdown>
            <Dropdown.Toggle variant="Secondary" id="dropdown-basic">
              All Categories
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item href="#/action-1">Category 1</Dropdown.Item>
              <Dropdown.Item href="#/action-2">Category 2</Dropdown.Item>
              <Dropdown.Item href="#/action-3">Category 3</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown> */}
        </div>
      </div>

      <Row className={styles.rows}>
        <Col lg={4} className={styles.option}>
          <div className={styles.serviceItem}>
            {/* <div>
              <img src="./photos/homeBuilding.png" width="150px" height="100px" />
            </div> */}
            HOUSE BUILDING
          </div>
        </Col>
        <Col lg={4} className={styles.option}>
          <div className={styles.serviceItem}>HOUSE RENOVATION</div>
        </Col>
        <Col lg={4} className={styles.option}>
          <div className={styles.serviceItem}>HOUSE REPAIR</div>
        </Col>
      </Row>
      <Row className={styles.rows}>
        <Col lg={4} className={styles.option}>
          <div className={styles.serviceItem}>HOUSE ASSESORIES</div>
        </Col>
        <Col lg={4} className={styles.option}>
          <div className={styles.serviceItem}> HOUSE SELL/PURCHASE</div>
        </Col>
        <Col lg={4} className={styles.option}>
          <div className={styles.serviceItem}>ADVICE FROM EXPERT</div>
        </Col>
      </Row>
      <Row className={styles.rows}>
        <Col lg={4} className={styles.option}>
          <div className={styles.serviceItem}> PACKAGER AND MOVER</div>
        </Col>
      </Row>
    </Container>
  );
};

export default RenovationOptions;
