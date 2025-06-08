import React, { useState } from "react";
import CustomButton from "../customBtn";
import { FaCheck } from "react-icons/fa6";
import { Card, CardBody } from "react-bootstrap";
import styles from "./index.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Plan = ({ title, price, benefits, duration, selectedPlan }) => {
  const navigate = useNavigate();
  const handleselected = async () => {
    try {
      await axios
        .post("/api/ace/updatesubscription", {
          id: localStorage.getItem("aauth"),
          planName: title,
          billingCycle: duration,
        })
        .then((response) => {
          if (response.status === 200) {
            console.log(response.data.user.aceData);
            alert(
              "User subscription plan updated successfully. Please Refresh/Reload"
            );
            navigate("/ace/profile");
          }
        })
        .catch((error) => {
          console.error("AxiosError:", error);
          console.log(error);
        });
    } catch (error) {
      console.error("Error:", error);
    }
  };
  return (
    <Card className={styles.priceCard}>
      <h5 className={styles.priceCardTitle}>{title}</h5>
      <h2 className={styles.priceCardPrice}>{price}</h2>
      <ul className={` list-unstyled my-4 ${styles.priceCardBenifits}`}>
        {benefits.map((benefit, index) => (
          <li key={index} className={styles.priceCardBenifit}>
            <FaCheck fill="#43cc93" /> {benefit}
          </li>
        ))}
      </ul>
      <CustomButton
        customClass={`mt-4 ${
          selectedPlan === title ? styles.selectedPlan : ""
        } `}
        width={"100%"}
        text={selectedPlan === title ? "Selected" : "Purchase"}
        onClick={() => handleselected()}
      />
    </Card>
  );
};

export default Plan;
