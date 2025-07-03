import React, { useState } from "react";
import CustomButton from "../customBtn";
import { FaCheck } from "react-icons/fa6";
import { Card, CardBody } from "react-bootstrap";
import styles from "./index.module.css";
import { useNavigate } from "react-router-dom";
import moment from "moment";

const Plan = ({
  title,
  price,
  benefits,
  duration,
  selectedPlan,
  endingDate,
}) => {
  const navigate = useNavigate();
  const date = new Date(endingDate);
  const formattedDate = moment(endingDate).format("DD/MM/YYYY");
  const handleselected = () => {
    console.log("hello");
    alert(
      "User subscription plan cannot be changed. If you want to change plan, contact our customer care number"
    );
  };
  return (
    <Card className={styles.priceCard}>
      <h5 className={styles.priceCardTitle}>{title}</h5>
      <h2 className={styles.priceCardPrice}>{price}</h2>
      <p className={styles.priceCardBenifit}>
        Plan's Ending Date:{selectedPlan === title && formattedDate}
      </p>
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
