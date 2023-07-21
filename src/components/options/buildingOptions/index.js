import React from "react";
import { Col, Container, Dropdown, Row } from "react-bootstrap";
import styles from "./index.module.css";
import { useNavigate } from "react-router-dom";
// import ScreenSlider from "../screenslider";

const BuildingOptions = ({ options, heading }) => {
  const navigate = useNavigate();
  const handleClick = (value) => {
    if (value === "All Services") {
      navigate("/services");
    } else {
      navigate("/services/service");
    }
  };
  return (
    <Container>
      <div className={styles.categoryDiv}>
        <div className={styles.howcanwehelp}> {heading}</div>
        <div className={styles.dropdown}></div>
      </div>

      <Row className={styles.rows}>
        {options.map((item) => {
          return (
            <Col lg={4}>
              <div className={styles.option}>
                <div className={styles.iconDiv}>
                  {/* <IconHomeBuilder /> */}
                  {/* <img src="/icons/building-icon.svg" style={{ fill: "red" }} /> */}
                  {item.icon}
                  {/* {
                    <svg
                      id="Layer_1"
                      data-name="Layer 1"
                      class="icon"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 122.88 106.35"
                      // fill="var(--color-primary)"
                    >
                      <title>residential-apartments</title>
                    </svg>
                  } */}
                </div>
                <div
                  className={styles.serviceItem}
                  onClick={() => {
                    handleClick(item.title);
                    // console.log(item);
                  }}
                >
                  {item.title}
                </div>
              </div>
            </Col>
          );
        })}
      </Row>
    </Container>
  );
};

export default BuildingOptions;
