import React, { useEffect, useState } from "react";
import { Col, Container, Form, Modal, Row } from "react-bootstrap";
import styles from "./index.module.css";
import CustomButton from "../../../components/customBtn";
import { Link as ScrollLink } from "react-scroll";
import { useDispatch } from "react-redux";
import { REMAININGTASKS } from "../../../redux/actions/actionRemainingTasks";

const ServiceRequest = () => {
  const [data, setData] = useState([
    {
      title: "Basement Renovation",
      discription:
        "2 rooms, want one game room and second like party room. Game machines also needed. In party room can we add pool and historical style look",
      type: "Home",
      timing: "Imidiate",
      customerName: "Harman Sidhu",
      location: "666,Diamond Avenue,Amritsar",
      number: "98456-34546",
      accepted: false,
      rejected: false,
      otpEntered: false,
      taskCompleted: false,
    },
    {
      title: "Room Renovation",
      discription:
        "2 rooms, want one game room and second like party room. Game machines also needed. In party room can we add pool and historical style look",
      type: "Home",
      timing: "Imidiate",
      customerName: "Harman Sidhu",
      location: "666,Diamond Avenue,Amritsar",
      number: "98456-34546",
      accepted: false,
      rejected: false,
      otpEntered: false,
      taskCompleted: false,
    },
    {
      title: "Bathroom Renovation",
      discription:
        "2 rooms, want one game room and second like party room. Game machines also needed. In party room can we add pool and historical style look",
      type: "Home",
      timing: "Imidiate",
      customerName: "Harman Sidhu",
      location: "666,Diamond Avenue,Amritsar",
      number: "98456-34546",
      accepted: false,
      rejected: false,
      otpEntered: false,
      taskCompleted: false,
    },
    {
      title: "Plumber",
      discription:
        "2 rooms, want one game room and second like party room. Game machines also needed. In party room can we add pool and historical style look",
      type: "Home",
      timing: "Imidiate",
      customerName: "Harman Sidhu",
      location: "666,Diamond Avenue,Amritsar",
      number: "98456-34546",
      accepted: false,
      rejected: false,
      otpEntered: false,
      taskCompleted: false,
    },
    {
      title: "Carpenter",
      discription:
        "2 rooms, want one game room and second like party room. Game machines also needed. In party room can we add pool and historical style look",
      type: "Home",
      timing: "Imidiate",
      customerName: "Harman Sidhu",
      location: "666,Diamond Avenue,Amritsar",
      number: "98456-34546",
      accepted: false,
      rejected: false,
      otpEntered: false,
      taskCompleted: false,
    },
  ]);
  const [acceptedItemIndex, setAcceptedItemIndex] = useState(null);
  const [profileModalShow, setProfileModalShow] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("allTasks");
  const [completedTasks, setCompletedTasks] = useState(0);
  const dispatch = useDispatch();
  useEffect(() => {
    let count = data.length - completedTasks;
    dispatch(REMAININGTASKS(count));
  }, [completedTasks, data]);
  const activeTab = (e) => {
    setSelectedFilter(e.target.title);
  };
  const handleReject = (index) => {
    const updatedItems = data.filter((item, i) => i !== index);
    setData(updatedItems);
  };
  const handleAccept = (index) => {
    setData((prevData) => {
      const updatedData = [...prevData];
      updatedData[index] = { ...updatedData[index], accepted: true };
      return updatedData;
    });
    setAcceptedItemIndex(index);
  };
  const handleOpt = (index) => {
    setData((prevData) => {
      const updatedData = [...prevData];
      updatedData[index] = {
        ...updatedData[index],
        otpEntered: true,
        taskCompleted: true,
      };
      return updatedData;
    });
    setCompletedTasks(completedTasks + 1);
    setProfileModalShow(false);
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
                  selectedFilter == "allTasks" ? styles.activeTab : ""
                }`}
              >
                All Tasks({data.length})
              </div>
            </ScrollLink>

            {completedTasks !== 0 && (
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
                    selectedFilter == "completedTasks" ? styles.activeTab : ""
                  }`}
                >
                  CompletedTasks({completedTasks})
                </div>
              </ScrollLink>
            )}
          </div>
        </Container>
      </div>
      <Container>
        <Row>
          <Col lg={12} id="allTasks" className={styles.allRequests}>
            {data.map((item, index) => {
              return (
                !item.taskCompleted && (
                  <Row className={styles.dynamicRow} key={index}>
                    <Col lg={12}>
                      <Col lg={12} className={styles.title}>
                        {item.title}
                      </Col>
                      <Col lg={8} className={styles.discription}>
                        <b>Discription</b> - {item.discription}
                      </Col>
                      <Col lg={12} className={styles.data}>
                        <b>Type</b> - {item.type}
                      </Col>
                      <Col lg={12} className={styles.data}>
                        <b>Timimg</b> - {item.timing}
                      </Col>

                      {item.accepted ? (
                        <>
                          <Col lg={12} className={styles.data}>
                            <b>Name</b> - {item.customerName}
                          </Col>
                          <Col lg={12} className={styles.data}>
                            <b>Location</b> - {item.location}
                          </Col>
                          <Col lg={12} className={styles.data}>
                            <b>Number</b> - {item.number}
                          </Col>
                        </>
                      ) : null}
                    </Col>

                    <Col lg={12} className={styles.btns}>
                      {item.accepted ? (
                        item.otpEntered ? (
                          <CustomButton
                            text={"Task Completed"}
                            width={"150px"}
                          />
                        ) : (
                          <CustomButton
                            text={"Enter Otp"}
                            width={"130px"}
                            onClick={() => setProfileModalShow(true)}
                          />
                        )
                      ) : (
                        <>
                          <CustomButton
                            text={"Reject"}
                            width={"130px"}
                            onClick={() => handleReject(index)}
                          />
                          <CustomButton
                            text={"Accept"}
                            width={"130px"}
                            onClick={() => handleAccept(index)}
                          />
                        </>
                      )}
                    </Col>
                  </Row>
                )
              );
            })}
          </Col>
          <Col lg={12} id="completedTasks" className={styles.allRequests}>
            {data.map((item, index) => {
              return (
                item.taskCompleted && (
                  <Row className={styles.dynamicRow} key={index}>
                    <Col lg={12}>
                      <Col lg={12} className={styles.title}>
                        {item.title}
                      </Col>
                      <Col lg={8} className={styles.discription}>
                        <b>Discription</b> - {item.discription}
                      </Col>
                      <Col lg={12} className={styles.data}>
                        <b>Type</b> - {item.type}
                      </Col>
                      <Col lg={12} className={styles.data}>
                        <b>Timimg</b> - {item.timing}
                      </Col>

                      {item.accepted ? (
                        <>
                          <Col lg={12} className={styles.data}>
                            <b>Name</b> - {item.customerName}
                          </Col>
                          <Col lg={12} className={styles.data}>
                            <b>Location</b> - {item.location}
                          </Col>
                          <Col lg={12} className={styles.data}>
                            <b>Number</b> - {item.number}
                          </Col>
                        </>
                      ) : null}
                    </Col>

                    <Col lg={12} className={styles.btns}>
                      {item.accepted ? (
                        item.otpEntered ? (
                          <button className={styles.requestedBtn}>
                            Task Completed
                          </button>
                        ) : (
                          <>
                            <CustomButton text={"Resend Otp"} width={"130px"} />
                            <CustomButton
                              text={"Enter Otp"}
                              width={"130px"}
                              onClick={() => setProfileModalShow(true)}
                            />
                          </>
                        )
                      ) : (
                        <>
                          <CustomButton
                            text={"Reject"}
                            width={"130px"}
                            onClick={() => handleReject(index)}
                          />
                          <CustomButton
                            text={"Accept"}
                            width={"130px"}
                            onClick={() => handleAccept(index)}
                          />
                        </>
                      )}
                    </Col>
                  </Row>
                )
              );
            })}
          </Col>
        </Row>
      </Container>
      <ProfileModal
        show={profileModalShow}
        onHide={() => setProfileModalShow(false)}
        handleOpt={() => handleOpt(acceptedItemIndex)}
      />
    </div>
  );
};

function ProfileModal(props) {
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
              <Form.Control required type="text" placeholder="otp..." />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>
          </Row>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <CustomButton text={"Close"} onClick={props.onHide} width={"auto"} />
        <CustomButton
          text={"Submit"}
          onClick={() => props.handleOpt()}
          width={"auto"}
        />
      </Modal.Footer>
    </Modal>
  );
}

export default ServiceRequest;
