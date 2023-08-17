import React from "react";
import CustomButton from "../customBtn";
import styles from "./index.module.css";
import { useNavigate } from "react-router-dom";

const AreYouServiceProvider = () => {
  const navigate = useNavigate();
  return (
    <div className={styles.main}>
      <div className={styles.innerDiv}>
        <h2>Are You Ace Service Provider?</h2>
        <h3>Connect with new customer, now.</h3>

        <CustomButton
          width={"250px"}
          text={"Get Started"}
          onClick={() => {
            navigate("/ace");
          }}
        />
      </div>
    </div>
  );
};

export default AreYouServiceProvider;
