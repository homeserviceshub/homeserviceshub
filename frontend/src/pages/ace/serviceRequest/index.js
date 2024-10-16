import React, { useEffect, useState } from "react";
import { Col, Container, Form, Modal, Row } from "react-bootstrap";
import styles from "./index.module.css";
import CustomButton, { CustomRedButton } from "../../../components/customBtn";
import { Link as ScrollLink } from "react-scroll";
import { useDispatch } from "react-redux";
import { REMAININGTASKS } from "../../../redux/actions/actionRemainingTasks";
import axios from "axios";
import DatePicker from "react-datepicker";
import moment from "moment";
import { BsCalendarDate, BsFacebook } from "react-icons/bs";

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
  //     cancelled: false,
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
  //     cancelled: false,
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
  //     cancelled: false,
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
  //     cancelled: false,
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
  //     cancelled: false,
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
  const [dateRange, setDateRange] = useState([
    new Date(new Date().setDate(new Date().getDate() - 30)),
    new Date(),
  ]);
  const [startDate, endDate] = dateRange;
  const dispatch = useDispatch();
  const fetchData = async () => {
    console.log("inside fetch data", dateRange);

    try {
      // setIsLoading(true);
      const response = await axios.post("/api/getprojectsdata", {
        clientID: localStorage.getItem("aauth"),
        from: dateRange[0],
        to: dateRange[1],
      });
      if (response.status === 200) {
        setData(response.data);
        localStorage.setItem(
          "totalProjects",
          data.filter((item) => item.status !== "completed").length
        );
        console.log(response.data);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    const userID = localStorage.getItem("aauth");
    if (userID && startDate !== null && endDate !== null) {
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
      const response = await axios.post("/api/evaluateservicerequest", {
        id: id,
      });
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
      const response = await axios.post("/api/rejectservicerequest", {
        id: id,
      });
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
      const response = await axios.post("/api/acceptservicerequest", {
        id: id,
        price: enteredPrice,
      });
      if (response.status === 200) {
        console.log(response);
        fetchData();
        // setIsLoading(false);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const handleOpt = async (id, otpEntered, paymentMethod) => {
    console.log(id);
    console.log(otpEntered);
    console.log(paymentMethod);
    try {
      // setIsLoading(true);
      const response = await axios.post("/api/completeservicerequest", {
        id: id,
        otpEntered: otpEntered,
        paymentMethod: paymentMethod,
      });
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
  const [selectedTab, setSelectedTab] = useState("allTasks");

  const handleTabClick = (tab) => {
    setSelectedTab(tab);
  };
  const handleDateChange = async (update) => {
    if (update[1]) {
      const endOfDay = new Date(update[1].setHours(23, 59, 59, 999));
      setDateRange([update[0], endOfDay]);
    } else {
      setDateRange(update);
    }
  };
  useEffect(() => {
    if (dateRange[0] !== null && dateRange[1] !== null) {
      fetchData();
    }
  }, [dateRange]);
  return (
    <div className={styles.backgroundColor}>
      <div className={styles.backGround}>
        <Container className={`${styles.containerY}`}>
          <div className={styles.tabsContainer}>
            <div className={`flex-wrap ${styles.tabs} ${styles.borderX}`}>
              <div className="d-flex  flex-wrap">
                <div
                  title="allTasks"
                  onClick={() => handleTabClick("allTasks")}
                  className={`${styles.tab} ${
                    selectedTab === "allTasks" ? styles.activeTab : ""
                  }`}
                >
                  All({data.length === undefined ? 0 : data.length})
                </div>
                <div
                  title="completedTasks"
                  onClick={() => handleTabClick("completedTasks")}
                  className={`${styles.tab} ${
                    selectedTab === "completedTasks" ? styles.activeTab : ""
                  }`}
                >
                  Completed(
                  {data?.message !== "No Projects Done Yet"
                    ? data.filter((item) => item.status === "completed").length
                    : 0}
                  )
                </div>
                <div
                  title="pendingTasks"
                  onClick={() => handleTabClick("pendingTasks")}
                  className={`${styles.tab} ${
                    selectedTab === "pendingTasks" ? styles.activeTab : ""
                  }`}
                >
                  Pending(
                  {data?.message !== "No Projects Done Yet"
                    ? data.filter(
                        (item) =>
                          item.status === "requested" ||
                          item.status === "evaluating" ||
                          item.status === "accepted"
                      ).length
                    : 0}
                  {/* {console.log(item.status)} */})
                </div>
                <div
                  title="cancelledTasks"
                  onClick={() => handleTabClick("cancelledTasks")}
                  className={`${styles.tab} ${
                    selectedTab === "cancelledTasks" ? styles.activeTab : ""
                  }`}
                >
                  Cancelled(
                  {data?.message !== "No Projects Done Yet"
                    ? data.filter((item) => item.status === "cancelled").length
                    : 0}
                  )
                </div>
              </div>
              <div>
                <div className={`${styles.dateDiv}`}>
                  <DatePicker
                    showIcon
                    selectsRange={true}
                    startDate={startDate}
                    endDate={endDate}
                    onChange={handleDateChange}
                    isClearable={true}
                    dateFormat="d/M/yyyy"
                  />
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>
      <Container>
        <Row className="m-0">
          {selectedTab === "allTasks" && (
            <Col lg={12} id="allTasks" className={styles.allRequests}>
              {data && data?.message !== "No Projects Done Yet" ? (
                data
                  .sort(
                    (a, b) => new Date(b.requestDate) - new Date(a.requestDate)
                  )
                  .map((item, index) => {
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
                            <Col lg={12} className={styles.discription}>
                              <b>Service Request Date</b> -{" "}
                              {moment(item.requestDate).format("DD/MM/YYYY")}
                            </Col>

                            {item.status !== "requested" ? (
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
                                  onClick={() =>
                                    handleEvaluate(item._id, index)
                                  } // Handle evaluate action
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
                              <button className={styles.requestedBtn}>
                                Task Completed
                              </button>
                            )}
                            {item.status === "cancelled" && (
                              <CustomRedButton
                                text={"Cancelled"}
                                width={"130px"}
                                customClass={styles.redBtn}
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
          )}
          {selectedTab === "completedTasks" && (
            <Col lg={12} id="completedTasks" className={styles.allRequests}>
              {data &&
              data?.message !== "No Projects Done Yet" &&
              selectedTab === "completedTasks" &&
              data.filter((item) => item.status === "completed").length > 0 ? (
                data
                  .filter((item) => item.status === "completed")
                  .sort(
                    (a, b) => new Date(b.requestDate) - new Date(a.requestDate)
                  )
                  ?.map((item, index) => {
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
                            <Col lg={12} className={styles.discription}>
                              <b>Service Request Date</b> -{" "}
                              {moment(item.requestDate).format("DD/MM/YYYY")}
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
                  })
              ) : (
                <div className={styles.noReviews}>No Tasks Available!!! </div>
              )}
            </Col>
          )}
          {selectedTab === "cancelledTasks" && (
            <Col lg={12} id="cancelledTasks" className={styles.allRequests}>
              {data &&
              data?.message !== "No Projects Done Yet" &&
              data.filter((item) => item.status === "cancelled").length ? (
                data
                  .sort(
                    (a, b) => new Date(b.requestDate) - new Date(a.requestDate)
                  )
                  .map((item, index) => {
                    return (
                      item.status === "cancelled" && (
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
                            <Col lg={12} className={styles.discription}>
                              <b>Service Request Date</b> -{" "}
                              {moment(item.requestDate).format("DD/MM/YYYY")}
                            </Col>
                          </Col>
                          <Col lg={12} className={styles.btns}>
                            <CustomRedButton
                              text={"Cancelled"}
                              width={"130px"}
                              customClass={styles.redBtn}
                            />
                          </Col>
                        </Row>
                      )
                    );
                  })
              ) : (
                <div className={styles.noReviews}>No Tasks Available!!! </div>
              )}
            </Col>
          )}
          {selectedTab === "pendingTasks" && (
            <Col lg={12} id="pendingTasks" className={styles.allRequests}>
              {data &&
              data?.message !== "No Projects Done Yet" &&
              data.filter(
                (item) =>
                  item.status === "requested" ||
                  item.status === "evaluating" ||
                  item.status === "accepted"
              ).length > 0 ? (
                data
                  .filter(
                    (item) =>
                      item.status === "requested" ||
                      item.status === "evaluating" ||
                      item.status === "accepted"
                  )
                  .sort(
                    (a, b) => new Date(b.requestDate) - new Date(a.requestDate)
                  )
                  .map((item, index) => {
                    return (
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
                          <Col lg={12} className={styles.discription}>
                            <b>Service Request Date</b> -{" "}
                            {moment(item.requestDate).format("DD/MM/YYYY")}
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
                        </Col>
                      </Row>
                    );
                  })
              ) : (
                <div className={styles.noReviews}>No Tasks Available!!! </div>
              )}
            </Col>
          )}
        </Row>
      </Container>
      <OtpModal
        show={otpModalShow}
        onHide={() => setOtpModalShow(false)}
        handleOpt={(enteredOtp, paymentMethod) =>
          handleOpt(acceptedItemIndex, enteredOtp, paymentMethod)
        }
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
              <Form.Label>
                Enter estimated price if decided(Optional)
              </Form.Label>
              <Form.Control
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
  const [paymentMethod, setPaymentMethod] = useState("");

  const handlePaymentMethodChange = (event) => {
    setPaymentMethod(event.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    props.handleOpt(enteredOtp, paymentMethod);
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
            <Form.Group as={Col} md="12" controlId="validationCustom02">
              <Form.Label>Payment Method</Form.Label>
              <Form.Control
                as="select"
                required
                value={paymentMethod}
                onChange={handlePaymentMethodChange}
              >
                <option value="" disabled>
                  Select
                </option>
                <option value="Cash">Cash</option>
                <option value="Card">Card</option>
                <option value="UPI">UPI</option>
                <option value="Others">Others</option>
              </Form.Control>
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
