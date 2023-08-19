import React from "react";
import styles from "./index.module.css";
import { useNavigate } from "react-router-dom";

const MainPhoto = () => {
  const navigate = useNavigate();
  return (
    <div className={styles.mainDiv}>
      <div className={styles.picture}></div>

      <div className={styles.header}>
        You Think We
        <span className={styles.headerSpan}>Build</span>
        <h3 className={styles.subHeader}>We help to build your dreams</h3>
        <div className={styles.outerButton}>
          <button
            className={styles.customButton}
            onClick={() => {
              navigate("/services/service");
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
