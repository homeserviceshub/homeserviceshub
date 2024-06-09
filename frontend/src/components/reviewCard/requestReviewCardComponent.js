import React, { useState, useEffect } from "react";
import { Card, Form, Modal, Row, Col } from "react-bootstrap";
import styles from "./index.module.css";
import AOS from "aos";
import CustomButton from "../customBtn";
import axios from "axios";
import moment from "moment";

const RequestReviewCardComponent = (props) => {
  const data = props.data;
  const [requesterData, setRequesterData] = useState();
  const [detailModalShow, setDetailModalShow] = useState(false);
  useEffect(() => {
    try {
      axios
        .post("http://localhost:8000/userdata", {
          _id: data.requestBy,
        })
        .then((response) => {
          if (response.status === 200) {
            setRequesterData(response.data);
          }
        });
    } catch (error) {
      console.error("Error:", error);
    }
  }, []);

  const photo = "/icons/default-profile-picture-male-icon.svg";
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <Card className={styles.dynamicCard} data-aos="fade-up">
      <div className={styles.upperColumn}>
        <Card.Img
          src={
            requesterData
              ? requesterData[0]?.profile_photo
                ? `http://localhost:8000/images/${requesterData[0].profile_photo.path}`
                : process.env.PUBLIC_URL + photo
              : process.env.PUBLIC_URL + photo
          }
          className={styles.cardImg}
        />
        <Card.Title className={styles.cardTitle}>
          <div>{data.selectedService}</div>{" "}
          <div>
            <Card.Subtitle className="mb-2 text-muted">
              Project Done on {moment(data?.requestDate).format("MMMM Do YYYY")}
            </Card.Subtitle>
            <Card.Subtitle className="mb-2 text-muted">
              Payment Mode : {data.paymentMode.toUpperCase()}
            </Card.Subtitle>
          </div>
        </Card.Title>
      </div>
      <div className={styles.lowerColumn}>
        <CustomButton
          text={"View Details"}
          onClick={() => {
            setDetailModalShow(true);
          }}
        />
      </div>
      <DetailModal
        show={detailModalShow}
        onHide={() => setDetailModalShow(false)}
        data={data}
      />
    </Card>
  );
};
function DetailModal(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Project Details
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Row>
            <Col lg={12} className="mb-3">
              <span className={styles.details}>Customer Name</span> -{" "}
              {props.data.customerDetails.name.toUpperCase()}
            </Col>
            <Col lg={12} className="mb-3">
              <span className={styles.details}>Project Name</span> -{" "}
              {props.data.selectedService.toUpperCase()}
            </Col>
            <Col lg={12} className="mb-3">
              <span className={styles.details}>Project Done on</span> -{" "}
              {moment(props.data.requestDate).format("MMMM Do YYYY")}
            </Col>
            <Col lg={12} className="mb-3">
              <span className={styles.details}>Payment Mode</span> -{" "}
              {props.data.paymentMode.toUpperCase()}
            </Col>
            <Col lg={12} className="mb-3">
              <span className={styles.details}>Project Discription</span> -{" "}
              {props.data.discription.toUpperCase()}
            </Col>
            <Col lg={12} className="mb-3">
              <span className={styles.details}>Project Accommodation</span> -{" "}
              {props.data.accommodation.toUpperCase()}
            </Col>
          </Row>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <CustomButton text={"Close"} onClick={props.onHide} width={"auto"} />
      </Modal.Footer>
    </Modal>
  );
}

export default RequestReviewCardComponent;
