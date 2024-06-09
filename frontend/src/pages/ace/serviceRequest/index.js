import React, { useEffect, useState } from "react";
import { Col, Container, Form, Modal, Row } from "react-bootstrap";
import styles from "./index.module.css";
import CustomButton, { CustomRedButton } from "../../../components/customBtn";
import { Link as ScrollLink } from "react-scroll";
import { useDispatch } from "react-redux";
import { REMAININGTASKS } from "../../../redux/actions/actionRemainingTasks";
import axios from "axios";

const ServiceRequest = () => {
  // const [data, setData] = useState([
  //   {
  //     title: "Basement Renovation",
  //     discription:
  //       "2 rooms, want one game room and second like party room. Game machines also needed. In party room can we add pool and historical style look",
  //     type: "Home",
  //     timing: "Imidiate",
  //     customerName: "Harman Sidhu",
  //     location: "666,Diamond Avenue,Amritsar",
  //     number: "98456-34546",
  //     accepted: false,
  //     rejected: false,
  //     otpEntered: false,
  //     taskCompleted: false,
  //   },
  //   {
  //     title: "Room Renovation",
  //     discription:
  //       "2 rooms, want one game room and second like party room. Game machines also needed. In party room can we add pool and historical style look",
  //     type: "Home",
  //     timing: "Imidiate",
  //     customerName: "Harman Sidhu",
  //     location: "666,Diamond Avenue,Amritsar",
  //     number: "98456-34546",
  //     accepted: false,
  //     rejected: false,
  //     otpEntered: false,
  //     taskCompleted: false,
  //   },
  //   {
  //     title: "Bathroom Renovation",
  //     discription:
  //       "2 rooms, want one game room and second like party room. Game machines also needed. In party room can we add pool and historical style look",
  //     type: "Home",
  //     timing: "Imidiate",
  //     customerName: "Harman Sidhu",
  //     location: "666,Diamond Avenue,Amritsar",
  //     number: "98456-34546",
  //     accepted: false,
  //     rejected: false,
  //     otpEntered: false,
  //     taskCompleted: false,
  //   },
  //   {
  //     title: "Plumber",
  //     discription:
  //       "2 rooms, want one game room and second like party room. Game machines also needed. In party room can we add pool and historical style look",
  //     type: "Home",
  //     timing: "Imidiate",
  //     customerName: "Harman Sidhu",
  //     location: "666,Diamond Avenue,Amritsar",
  //     number: "98456-34546",
  //     accepted: false,
  //     rejected: false,
  //     otpEntered: false,
  //     taskCompleted: false,
  //   },
  //   {
  //     title: "Carpenter",
  //     discription:
  //       "2 rooms, want one game room and second like party room. Game machines also needed. In party room can we add pool and historical style look",
  //     type: "Home",
  //     timing: "Imidiate",
  //     customerName: "Harman Sidhu",
  //     location: "666,Diamond Avenue,Amritsar",
  //     number: "98456-34546",
  //     accepted: false,
  //     rejected: false,
  //     otpEntered: false,
  //     taskCompleted: false,
  //   },
  // ]);
  const [data, setData] = useState([]);
  const [acceptedItemIndex, setAcceptedItemIndex] = useState(null);
  const [profileModalShow, setProfileModalShow] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("allTasks");
  const [completedTasks, setCompletedTasks] = useState(0);
  const [taskInProgress, setTaskInProgress] = useState(false);
  const [otpId, setOtpId] = useState();
  const dispatch = useDispatch();
  const fetchData = async () => {
    try {
      // setIsLoading(true);
      const response = await axios.post(
        "http://localhost:8000/getprojectsdata",
        {
          clientID: localStorage.getItem("aauth"),
        }
      );
      if (response.status === 200) {
        setData(response.data);
        localStorage.setItem(
          "totalProjects",
          data.filter((item) => item.status !== "completed").length
        );
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  useEffect(() => {
    // let count = data.filter((item) => item.status === "requested").length;
    // dispatch(
    //   REMAININGTASKS(data.filter((item) => item.status !== "completed").length)
    // );
    // localStorage.setItem(
    //   "totalProjects",
    //   data.filter((item) => item.status !== "completed").length
    // );
  }, [completedTasks, data, dispatch, fetchData]);
  useEffect(() => {
    const userID = localStorage.getItem("aauth");
    if (userID) {
      fetchData();
    }
  }, []);

  const activeTab = (e) => {
    setSelectedFilter(e.target.title);
  };
  const [otpModalShow, setOtpModalShow] = useState(false);
  const [acceptModalShow, setAcceptModalShow] = useState(false);
  const handleEvaluate = async (id, index) => {
    try {
      // setIsLoading(true);
      const response = await axios.post(
        "http://localhost:8000/evaluateservicerequest",
        {
          id: id,
        }
      );
      if (response.status === 200) {
        fetchData();
      }
    } catch (error) {
      console.error("Error evaluating request:", error);
      console.log(error);
    }
  };

  const handleReject = async (id, index) => {
    try {
      // setIsLoading(true);
      const response = await axios.post(
        "http://localhost:8000/rejectservicerequest",
        {
          id: id,
        }
      );
      if (response.status === 200) {
        console.log(response);
        fetchData();
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const handleAccept = async (id, enteredPrice) => {
    console.log("Accepted price:", enteredPrice);
    console.log("Service request ID:", id);
    setAcceptModalShow(false);
    try {
      // setIsLoading(true);
      const response = await axios.post(
        "http://localhost:8000/acceptservicerequest",
        {
          id: id,
          price: enteredPrice,
        }
      );
      if (response.status === 200) {
        console.log(response);
        fetchData();
        // setIsLoading(false);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const handleOpt = async (id, otpEntered) => {
    console.log(id);
    console.log(otpEntered);
    try {
      // setIsLoading(true);
      const response = await axios.post(
        "http://localhost:8000/completeservicerequest",
        {
          id: id,
          otpEntered: otpEntered,
        }
      );
      if (response.status === 200) {
        console.log("task complpeted");
        fetchData();
        // setIsLoading(false);
      }
    } catch (error) {
      console.error("Error:", error);
    }
    setOtpModalShow(false);
  };
  return (
    <div className={styles.backgroundColor}>
      <div className={styles.backGround}>
        <Container className={`${styles.containerY}`}>
          <div className={`${styles.tabs} ${styles.borderX} `}>
            <ScrollLink
              to="allTasks"
              smooth={true}
              duration={500}
              offset={-170}
            >
              <div
                title="allTasks"
                onClick={activeTab}
                lg={1}
                className={`${styles.tab} ${
                  selectedFilter === "allTasks" ? styles.activeTab : ""
                }`}
              >
                All Tasks({data.length === undefined ? 0 : data.length})
              </div>
            </ScrollLink>
            {data && data?.message !== "No Projects Done Yet"
              ? data.filter((item) => item.status === "completed").length !==
                  0 && (
                  <ScrollLink
                    to="completedTasks"
                    smooth={true}
                    duration={500}
                    offset={-170}
                  >
                    <div
                      title="completedTasks"
                      onClick={activeTab}
                      lg={1}
                      className={`${styles.tab} ${
                        selectedFilter === "completedTasks"
                          ? styles.activeTab
                          : ""
                      }`}
                    >
                      CompletedTasks(
                      {
                        data.filter((item) => item.status === "completed")
                          .length
                      }
                      )
                    </div>
                  </ScrollLink>
                )
              : ""}
          </div>
        </Container>
      </div>
      <Container>
        <Row className="m-0">
          <Col lg={12} id="allTasks" className={styles.allRequests}>
            {data && data?.message !== "No Projects Done Yet" ? (
              data
                .filter((item) => item.status !== "completed")
                ?.map((item, index) => {
                  return (
                    !item.taskCompleted && (
                      <Row className={styles.dynamicRow} key={index}>
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

                          {item.status === "evaluating" ||
                          item.status === "accepted" ? (
                            <>
                              <Col lg={12} className={styles.data}>
                                <b>Name</b> - {item.customerDetails.name}
                              </Col>

                              <Col lg={12} className={styles.data}>
                                <b>Number</b> - {item.customerDetails.number}
                              </Col>
                            </>
                          ) : null}
                        </Col>

                        <Col lg={12} className={styles.btns}>
                          {item.status === "requested" && (
                            <>
                              {/* Initial step: Evaluate or Reject */}
                              <CustomButton
                                text={"Evaluate"}
                                width={"130px"}
                                onClick={() => handleEvaluate(item._id, index)} // Handle evaluate action
                              />
                              <CustomRedButton
                                text={"Reject"}
                                width={"130px"}
                                onClick={() => handleReject(item._id, index)} // Handle reject action
                              />
                            </>
                          )}
                          {item.status === "evaluating" && (
                            <>
                              {/* Secondary step: Accept or Reject after evaluation */}
                              <CustomButton
                                text={"Accept"}
                                width={"130px"}
                                onClick={() => {
                                  setAcceptModalShow(true);
                                  setAcceptedItemIndex(item._id);
                                }} // Handle accept action
                              />
                              <CustomRedButton
                                text={"Reject"}
                                width={"130px"}
                                onClick={() => handleReject(item._id, index)} // Handle reject action
                              />
                            </>
                          )}
                          {item.status === "accepted" && (
                            <CustomButton
                              text={"Enter Otp"}
                              width={"130px"}
                              onClick={() => {
                                setOtpModalShow(true);
                                setAcceptedItemIndex(item._id);
                              }}
                            />
                          )}
                          {item.status === "completed" && (
                            <CustomButton
                              text={"Task Completed"}
                              width={"150px"}
                            />
                          )}
                        </Col>
                      </Row>
                    )
                  );
                })
            ) : (
              <div className={styles.noReviews}>No Tasks Available!!! </div>
            )}
          </Col>
          <Col lg={12} id="completedTasks" className={styles.allRequests}>
            {data &&
              data?.message !== "No Projects Done Yet" &&
              data.map((item, index) => {
                return (
                  item.status === "completed" && (
                    <Row className={styles.dynamicRow} key={index}>
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
                    </Row>
                  )
                );
              })}
          </Col>
        </Row>
      </Container>
      <OtpModal
        show={otpModalShow}
        onHide={() => setOtpModalShow(false)}
        handleOpt={(enteredOtp) => handleOpt(acceptedItemIndex, enteredOtp)}
      />
      <AcceptModal
        show={acceptModalShow}
        onHide={() => setAcceptModalShow(false)}
        handleAccept={(enteredPrice) =>
          handleAccept(acceptedItemIndex, enteredPrice)
        }
      />
    </div>
  );
};

function AcceptModal(props) {
  const [enteredPrice, setEnteredPrice] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    props.handleAccept(enteredPrice);
  };

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Enter Accepted Price
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Row className="mb-3">
            <Form.Group as={Col} md="12" controlId="validationCustom01">
              <Form.Label>Enter Decided Price</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="price..."
                value={enteredPrice}
                onChange={(e) => setEnteredPrice(e.target.value)}
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>
          </Row>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <CustomButton text={"Close"} onClick={props.onHide} width={"auto"} />
        <CustomButton text={"Submit"} onClick={handleSubmit} width={"auto"} />
      </Modal.Footer>
    </Modal>
  );
}

function OtpModal(props) {
  const [enteredOtp, setEnteredOtp] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    props.handleOpt(enteredOtp);
  };
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Enter Your OTP
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Row className="mb-3">
            <Form.Group as={Col} md="12" controlId="validationCustom01">
              <Form.Label>Enter OTP</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="otp..."
                value={enteredOtp}
                onChange={(e) => setEnteredOtp(e.target.value)}
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>
          </Row>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <CustomButton text={"Close"} onClick={props.onHide} width={"auto"} />
        <CustomButton text={"Submit"} onClick={handleSubmit} width={"auto"} />
      </Modal.Footer>
    </Modal>
  );
}

export default ServiceRequest;
