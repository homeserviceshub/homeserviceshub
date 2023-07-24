import React from "react";
import styles from "./index.module.css";
import CustomButton from "../customBtn";
import { Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const MainPhoto = () => {
  const navigate = useNavigate();
  return (
    <div className={styles.div}>
      <div className={styles.divv}></div>

      <div className={styles.divvv}>
        <div className={styles.harmn}>
          Build Your <span className={styles.divvvv}>Dream</span>
        </div>

        <h3 className={styles.jshn}>We help to build your dreams</h3>
        <div className={styles.outerButton}>
          <button
            className={styles.customButton}
            onClick={() => {
              navigate("/services");
            }}
          >
            Discover Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default MainPhoto;
