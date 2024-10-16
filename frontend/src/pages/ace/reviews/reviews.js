import React, { useEffect, useState } from "react";
import styles from "./index.module.css";
import { Container, Row, Col } from "react-bootstrap";
import { Link as ScrollLink } from "react-scroll";
import ReviewCardComponent from "../../../components/reviewCard";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AceReviews = () => {
  const [selectedFilter, setSelectedFilter] = useState("all");
  const navigate = useNavigate();
  const stars = ["1", "2", "3", "4", "5"];
  const [reviews, setReviews] = useState([]);
  const [projectsDone, setProjectsDone] = useState([]);
  const activeTab = (e) => {
    setSelectedFilter(e.target.title);
  };
  useEffect(() => {
    const id = localStorage.getItem("aauth");
    if (id) {
      try {
        axios
          .post("/api/getreviews", {
            id: id,
          })
          .then((response) => {
            if (response.status === 200) {
              if (response.data.message) {
                console.log(response.data.message);
              } else {
                // console.log("Reviews data: ", response.data);
                setReviews(response.data);
              }
            }
          })
          .catch((error) => {
            console.error("AxiosError:", error);
          });
      } catch (error) {
        console.error("Error:", error);
      }
      try {
        axios
          .post("/api/getprojectsdone", {
            clientID: id,
          })
          .then((response) => {
            if (response.status === 200) {
              if (response.data.message) {
                console.log(response.data.message);
              } else {
                console.log("Projects data: ", response.data);
                setProjectsDone(response.data);
              }
            }
          })
          .catch((error) => {
            console.error("AxiosError:", error);
          });
      } catch (error) {
        console.error("Error:", error);
      }
    } else {
      navigate("/ace/signin", {
        replace: true,
      });
    }
  }, []);
  return (
    <div className={styles.customContainer}>
      <Container className={styles.containerX}>
        <Row id="all" className="m-0">
          <Col lg={12} className={styles.reviewHeading}>
            <div>Reviews({reviews.length})</div>
          </Col>
          {reviews.length > 0 ? (
            <ReviewCardComponent data={reviews} photosOf={"reviewer"} />
          ) : (
            <div className={styles.noReviews}>No Reviews Yet!!!</div>
          )}
        </Row>
      </Container>
    </div>
  );
};

export default AceReviews;
