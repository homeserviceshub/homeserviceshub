import React, { useEffect, useState } from "react";
import Plan from "../../components/plan";
import { Col, Container, Row } from "react-bootstrap";
import styles from "./index.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Plans = () => {
  const [planTime, setPlanTime] = useState("Monthly");
  const [selectedPlan, setSelectedPlan] = useState("Free");
  const navigate = useNavigate();
  const fetchData = async () => {
    const id = localStorage.getItem("aauth");
    if (id) {
      try {
        axios
          .post("/api/acedata", {
            id: id,
          })
          .then((response) => {
            if (response.status === 200) {
              if (response.data.message) {
                console.log(response.data.message);
              } else {
                setSelectedPlan(
                  response.data.aceData.subscriptionPlan.planName
                );
              }
            }
          })
          .catch((error) => {
            console.error("AxiosError:", error);
            console.log(error);
          });
      } catch (error) {
        console.error("Error:", error);
      }
    } else {
      navigate("/ace/signin", {
        replace: true,
      });
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  const planData = [
    {
      title: "Free Plan",
      price: "Free",
      yearlyPrices: "Free",
      benefits: [
        "Accept up to 5 Service Requests Per Month",
        "Single Task Management at a Time",
        "Unlimited Tasks Storage",
        "Upload unlimited photos",
      ],
    },
    {
      title: "Basic Plan",
      yearlyPrices: "₹1999/year",
      price: "₹199.99/month",
      benefits: [
        "Accept upto 10 Service Requests Per Month",
        "Multiple Task Management upto 3",
        "Unlimited Tasks Storage",
        "Upload unlimited photos",
        "Free boost for 10 days",
      ],
    },
    {
      title: "Standard Plan",
      yearlyPrices: "₹4999/year",
      price: "₹499.99/month",
      benefits: [
        "Accept upto 20 Service Requests Per Month",
        "Multiple Task Management upto 5",
        "Unlimited Tasks Storage",
        "Upload unlimited photos",
        "Free boost for 20 days",
      ],
    },
    {
      title: "Premium Plan",
      yearlyPrices: "₹9999/year",
      price: "₹999.99/month",
      benefits: [
        "Accept upto 50 Service Requests Per Month",
        "Multiple Task Management upto 10",
        "Unlimited Tasks Storage",
        "Upload unlimited photos",
        "Free boost for 30 days",
      ],
    },
    {
      title: "Exclusive Plan",
      yearlyPrices: "₹19999/year",
      price: "₹1999.99/month",
      benefits: [
        "Accept upto 100 Service Requests Per Month",
        "Multiple Task Management upto 20",
        "24/7 Support",
        "Unlimited Tasks Storage",
        "Upload unlimited photos",
        "Free boost for 60 days",
      ],
    },
  ];
  const handlePlanChange = (event) => {
    setPlanTime(event.target.value);
    console.log(event.target.value);
  };

  return (
    <Container className="mt-4">
      <h2 className="mb-4">Service Providers Plans</h2>
      <div className="d-flex justify-content-center gap-3 my-5 ">
        <label htmlFor="Monthly">
          <input
            type="radio"
            id="Monthly"
            name="planTime"
            value="Monthly"
            checked={planTime === "Monthly"}
            onChange={handlePlanChange}
          />
          Monthly Plans
        </label>
        <br />
        <label htmlFor="Yearly">
          <input
            type="radio"
            id="Yearly"
            name="planTime"
            value="Yearly"
            checked={planTime === "Yearly"}
            onChange={handlePlanChange}
          />
          Yearly Plans
        </label>
      </div>
      <Row className={styles.planRow}>
        {planData.map((item, index) => {
          return (
            <Col key={index} className="mb-3 p-0">
              <Plan
                title={item.title}
                price={planTime === "Monthly" ? item.price : item.yearlyPrices}
                benefits={item.benefits}
                planTime={planTime}
                selectedPlan={selectedPlan}
              />
            </Col>
          );
        })}
      </Row>
    </Container>
  );
};

export default Plans;
