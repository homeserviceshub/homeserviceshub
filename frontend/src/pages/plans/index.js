import React, { useEffect, useState } from "react";
import Plan from "../../components/plan";
import { Col, Container, Row } from "react-bootstrap";
import styles from "./index.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { planData } from "../../Data/DataList";

const Plans = () => {
  const [selectedPlan, setSelectedPlan] = useState("Starter Listing");
  const [endingDate, setEndingDate] = useState();
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
                setEndingDate(
                  response.data.aceData.subscriptionPlan.endingDate
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

  return (
    <Container className="mt-4">
      <h2 className="mb-4">Service Providers Plans</h2>
      {/* <div className="d-flex justify-content-center gap-3 my-5 ">
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
      </div> */}
      <Row className={styles.planRow}>
        {planData.map((item, index) => {
          return (
            <Col key={index} className="mb-3 p-0">
              <Plan
                title={item.title}
                duration={item.duration}
                price={item.price}
                benefits={item.benefits}
                selectedPlan={selectedPlan}
                endingDate={endingDate}
              />
            </Col>
          );
        })}
      </Row>
    </Container>
  );
};

export default Plans;
