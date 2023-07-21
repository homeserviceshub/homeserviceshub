import React from "react";
import CustomButton from "../customBtn";
import styles from "./index.module.css";

const AreYouServiceProvider = () => {
  return (
    <div className={styles.main}>
      <div className={styles.innerDiv}>
        <h2>Are You Ace Service Provider?</h2>
        <h3>Connect with new customers, now.</h3>
        <div className={styles.btnDiv}>
          <CustomButton text={"Get Started"} />
        </div>
      </div>
    </div>
  );
};

export default AreYouServiceProvider;
