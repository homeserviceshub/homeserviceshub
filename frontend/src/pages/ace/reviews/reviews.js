import React, { useEffect, useState } from "react";
import styles from "./index.module.css";
import { Container, Row, Col } from "react-bootstrap";
import { Link as ScrollLink } from "react-scroll";
import ReviewCardComponent from "../../../components/reviewCard";
import axios from "axios";

const AceReviews = () => {
  const [selectedFilter, setSelectedFilter] = useState("all");
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
          .post("http://localhost:8000/getreviews", {
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
          .post("http://localhost:8000/getprojectsdone", {
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
      <div className={styles.backGround}>
        <Container className={`${styles.containerY}`}>
          <div className={`${styles.tabs} ${styles.borderX} `}>
            <ScrollLink to="all" smooth={true} duration={500} offset={-150}>
              <div
                title="all"
                onClick={activeTab}
                lg={1}
                className={`${styles.tab} ${
                  selectedFilter === "all" ? styles.activeTab : ""
                }`}
              >
                All Reviews
              </div>
            </ScrollLink>

            <ScrollLink
              to="projectdone"
              smooth={true}
              duration={500}
              offset={-150}
            >
              <div
                title="projectdone"
                onClick={activeTab}
                lg={1}
                className={`${styles.tab} ${
                  selectedFilter === "projectdone" ? styles.activeTab : ""
                }`}
              >
                Projects Done
              </div>
            </ScrollLink>
          </div>
        </Container>
      </div>

      <Container className={styles.containerX}>
        <Row id="all" className="m-0">
          <Col lg={12} className={styles.reviewHeading}>
            <div>Reviews({reviews.length})</div>
          </Col>
          {reviews.length > 0 ? (
            <ReviewCardComponent data={reviews} photosOf={"index"} />
          ) : (
            <div className={styles.noReviews}>No Reviews Yet!!!</div>
          )}
        </Row>
        <Row id="projectdone" className="m-0 pb-3">
          <Col lg={12} className={styles.reviewHeading}>
            <div>Projects done({projectsDone.length})</div>
          </Col>
          {projectsDone && projectsDone.length > 0 ? (
            projectsDone.map((item, index) => {
              return (
                item.status === "completed" && (
                  <Col lg={12} className={styles.dynamicRow} key={index}>
                    <Col lg={12}>
                      <Col lg={12} className={styles.title}>
                        {item.selectedService}
                      </Col>
                      <Col lg={12} className={styles.data}>
                        <b>Location</b> - {item.customerDetails.address}
                      </Col>
                      <Col lg={12} className={styles.data}>
                        <b>Type</b> - {item.accommodation}
                      </Col>
                      <Col lg={12} className={styles.data}>
                        <b>Timimg</b> - {item.serviceNeed}
                      </Col>
                      <Col lg={12} className={styles.discription}>
                        <b>Discription</b> - {item.discription}
                      </Col>
                      <>
                        <Col lg={12} className={styles.data}>
                          <b>Name</b> - {item.customerDetails.name}
                        </Col>
                        <Col lg={12} className={styles.data}>
                          <b>Number</b> - {item.customerDetails.number}
                        </Col>
                      </>
                    </Col>
                    <Col lg={12} className={styles.btns}>
                      <button className={styles.requestedBtn}>
                        Task Completed
                      </button>
                    </Col>
                  </Col>
                )
              );
            })
          ) : (
            <div className={styles.noReviews}>No Projects Yet!!! </div>
          )}
        </Row>
      </Container>
    </div>
  );
};

export default AceReviews;
