import React from "react";
import CustomButton from "../customBtn";
import { useNavigate } from "react-router-dom";
import styles from "./index.module.css";

const SwitchToUser = () => {
  const navigate = useNavigate();
  return (
    <div className={styles.main}>
      <div className={styles.innerDiv}>
        <h2>Switch To Costomer Dashboard</h2>

        <CustomButton
          width={"250px"}
          text={"Switch"}
          onClick={() => {
            navigate("/");
          }}
        />
      </div>
    </div>
  );
};

export default SwitchToUser;
