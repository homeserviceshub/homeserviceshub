import React, { useEffect } from "react";
import { Col, Container, Dropdown, Row } from "react-bootstrap";
import styles from "./index.module.css";
import { useNavigate } from "react-router-dom";
// import ScreenSlider from "../screenslider";
import { useDispatch } from "react-redux";
import { SELECTEDSERVICE } from "../../../redux/actions/action1";
import AOS from "aos";
import "aos/dist/aos.css";

const BuildingOptions = ({ options, heading }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init();
  }, []);

  const handleClick = (value) => {
    dispatch(SELECTEDSERVICE(value));
    if (value === "ALL SERVICES") {
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
        {options.map((item, index) => {
          return (
            <Col
              data-aos="fade-up"
              key={index}
              lg={4}
              onClick={() => {
                handleClick(item.title);
              }}
            >
              <div className={styles.option}>
                <div className={styles.iconDiv}>{item.icon}</div>
                <div className={styles.serviceItem}>{item.title}</div>
              </div>
            </Col>
          );
        })}
      </Row>
    </Container>
  );
};

export default BuildingOptions;
