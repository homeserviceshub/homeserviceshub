import React, { useEffect, useState } from "react";
import { Container, Row, Col, Modal, Form } from "react-bootstrap";
import styles from "./index.module.css";
import { BsStar, BsStarFill, BsStarHalf } from "react-icons/bs";
import { FaEdit } from "react-icons/fa";
import Help from "../../../components/help";
import CustomButton from "../../../components/customBtn";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import SwitchToUser from "../../../components/switchToUser";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import RequestServiceDropdown from "../../../components/customDropdown/requestServiceDropdown";
import { allServices } from "../../../Data/DataList";
import CheckboxDropdown from "../../../components/customDropdown/checkboxDropdown";

const AceProfile = () => {
  const [profileModalShow, setProfileModalShow] = useState(false);
  const [discriptionModalShow, setDiscriptionModalShow] = useState(false);
  const [socialModalShow, setSocialModalShow] = useState(false);
  const [detailModalShow, setDetailModalShow] = useState(false);
  const [projectsModalShow, setProjectsModalShow] = useState(false);
  const [aceData, setAceData] = useState();
  const navigate = useNavigate();
  const [discription] = useState(
    "Here you can write about your company, specify skills, service areas, services or about your team. Remember word limit is 1000 words"
  );
  const auth = localStorage.getItem("aauth");
  const [loggedIn, setLoggedIn] = useState();
  const [dummyData, setDummyData] = useState(aceData);
  useEffect(() => {
    if (auth === null || auth === "null") {
      navigate("/ace/signin");
      setLoggedIn(false);
    } else {
      setLoggedIn(true);
      fetchData();
    }
  }, [auth, navigate]);

  const fetchData = async () => {
    const id = localStorage.getItem("aauth");

    if (id) {
      const source = axios.CancelToken.source();
      try {
        const response = await axios.post(
          "/api/acedata",
          {
            id: id,
          },
          { cancelToken: source.token }
        );

        if (response.status === 200) {
          setAceData(response.data.aceData);
          setDummyData(response.data.aceData);
          console.log(response.data.aceData);
        }
      } catch (error) {
        if (axios.isCancel(error)) {
          console.log("Request canceled", error.message);
        } else {
          console.error("Error:", error);
        }
      }
      return () => {
        source.cancel("Operation canceled by the user.");
      };
    } else {
      navigate("/ace/signin", {
        replace: true,
      });
    }
  };
  const [selectedImage, setSelectedImage] = useState(null);
  const handleFormChange = (event) => {
    const { name, value } = event.target;

    // Update state based on the input field name
    if (name === "serviceAreas") {
      setDummyData((prev) => ({
        ...prev,
        serviceAreas: value.split(",").map((area) => area.trimStart()),
      }));
    } else {
      setDummyData({
        ...dummyData,
        [name]: value,
      });
    }
  };
  const handleServicesChange = (selectedServices) => {
    setDummyData((prev) => ({
      ...prev,
      services: selectedServices,
    }));
  };

  const handleimagechange = (event) => {
    setDummyData({
      ...dummyData,
      profilePhoto: event.target.files[0], // Use the first file from event.target.files
    });
  };
  const handleClose = () => {
    setDummyData({
      ...aceData,
    });
    setProfileModalShow(false);
    setSocialModalShow(false);
    setDetailModalShow(false);
    setDiscriptionModalShow(false);
    setProjectsModalShow(false);
  };
  const handlechanges = async () => {
    var data;
    // If there is a new profile photo, upload it
    if (dummyData.profilePhoto) {
      try {
        const formData = new FormData();
        formData.append("media", dummyData.profilePhoto);

        const response = await axios.post("/api/upload", formData);

        if (response.status === 200) {
          const mediaObject = {
            url: response.data.fileUrl,
            type: "image",
          };

          data = mediaObject;

          // Update aceData and dummyData with the new profile photo
          setAceData((prevData) => ({
            ...prevData,
            profilePhoto: mediaObject,
          }));

          setDummyData((prevData) => ({
            ...prevData,
            profilePhoto: mediaObject,
          }));
        }
      } catch (error) {
        console.error("Error uploading media:", error);
      }
    }

    // Update user data on the backend
    try {
      await axios
        .post("/api/updateaceuser", {
          data: {
            ...dummyData,
            profilePhoto: data,
          },
          id: localStorage.getItem("aauth"),
        })
        .then((response) => {
          if (response.status === 200) {
            alert("User data updated successfully");
            fetchData();
          }
        })
        .catch((error) => {
          console.error("AxiosError:", error);
          console.log(error);
        });
    } catch (error) {
      console.error("Error:", error);
    }

    // Close all modal windows
    setProfileModalShow(false);
    setSocialModalShow(false);
    setDetailModalShow(false);
    setDiscriptionModalShow(false);
    setProjectsModalShow(false);
  };

  return (
    <div className={styles.customContainer}>
      <div className={styles.companyProfileBackground}>
        <Container className={styles.containerX}>
          <Row className={styles.complanyProfilePhotoRow}>
            <Col lg={2} className={styles.companyProfilePhoto}>
              <div>
                {aceData?.profilePhoto &&
                aceData?.profilePhoto?.url?.length > 0 ? (
                  <img
                    src={`${aceData.profilePhoto.url}`}
                    alt="Selected"
                    width={"350px"}
                    height={"350px"}
                    className={styles.profileImg}
                  />
                ) : (
                  <img
                    src={
                      process.env.PUBLIC_URL +
                      "/icons/default-profile-picture-male-icon.svg"
                    }
                    width={100}
                    height={100}
                    className={styles.profileImg}
                  />
                )}
              </div>
            </Col>
            <Col lg={7} className={styles.profileMainCol}>
              <Row className={styles.profileRow}>
                <Col lg={12} className={styles.companyName}>
                  {aceData ? aceData.companyName : "Company Name"}
                </Col>
                <Col lg={12} className={styles.profileCol}>
                  {aceData ? aceData.location : "Location"}
                </Col>
                <Col lg={12} className={styles.profileCol}>
                  {" "}
                  ({aceData ? aceData?.totalReviews : "0"})Reviews
                </Col>
              </Row>
            </Col>
            <Col lg={3} className={styles.profilebtns}>
              <div className={styles.profilebtn}>
                <CustomButton
                  text={"See Plans"}
                  onClick={() => navigate("/ace/plans")}
                />
              </div>
              <div className={styles.profilebtn}>
                <CustomButton
                  text={"Edit Profile"}
                  onClick={() => setProfileModalShow(true)}
                />
              </div>
              {/* <div className={styles.profilebtn}>
                <CustomButton
                  text={"Customer Dashboard"}
                  onClick={() => setProfileModalShow(true)}
                />
              </div> */}
            </Col>
          </Row>
        </Container>
      </div>

      <Container className={styles.containerY}>
        <Row id="overview">
          {aceData?.idProof?.PhoneVerification !== "done" ? (
            <Col lg={12} className={`${styles.overview} `}>
              <div
                className={`${styles.borders} w-auto d-flex ${styles.verificationDiv}`}
              >
                <div className="m-0">
                  <h5>Enhance Your Ace Profile with Verification!</h5>
                  <p className="m-0">
                    Complete verification to boost your profile visibility and
                    attract more clients. Click VERIFY now to get started!
                  </p>
                </div>
                <div>
                  {" "}
                  <CustomButton
                    text="Verify Now"
                    width={"auto"}
                    height={"auto"}
                    onClick={() => navigate("/ace/verification")}
                  />{" "}
                </div>
              </div>
            </Col>
          ) : (
            ""
          )}

          <Col lg={8} className={styles.overview}>
            <Row className={`${styles.overviewRow} m-0`}>
              <Col className={`${styles.overviewCol} ${styles.borders}`}>
                <span
                  className={styles.editIcon}
                  onClick={() => setDiscriptionModalShow(true)}
                >
                  <FaEdit />
                </span>
                {aceData?.brief ? aceData.brief : discription}
              </Col>
            </Row>
            <Row className={`${styles.rating} m-0`}>
              <Col className={`${styles.ratingCol} ${styles.borders}`}>
                <span
                  className={styles.editIcon}
                  onClick={() => setProjectsModalShow(true)}
                >
                  <FaEdit />
                </span>
                <div className={styles.ratingDiv1}>
                  <div className={styles.ratingDiv11}>Overall Ratings</div>
                  <div className={styles.ratingDiv12}>
                    <span>
                      <BsStarFill fill="gold" />
                    </span>{" "}
                    {Math.floor(aceData?.overallRating)}/5
                  </div>
                </div>
                <div className={styles.ratingDiv2}>
                  <div className={styles.ratingDiv21}>
                    <div className={styles.ratingDiv211}>
                      Reviews Rating{" "}
                      <Help
                        text={
                          "Stars on the basis of average of all reviews given by users."
                        }
                      />
                    </div>
                    <div className={styles.allStars}>
                      {[...Array(5)].map((_, index) => {
                        const rating = Number(aceData?.avgRating);
                        const fullStars = Math.floor(rating);
                        const hasHalfStar = rating - fullStars >= 0.5;

                        return (
                          <span key={index}>
                            {index < fullStars ? (
                              <BsStarFill fill="gold" />
                            ) : index === fullStars && hasHalfStar ? (
                              <BsStarHalf fill="gold" />
                            ) : (
                              <BsStar fill="gold" />
                            )}
                          </span>
                        );
                      })}
                    </div>
                  </div>
                  <div className={styles.ratingDiv21}>
                    <div className={styles.ratingDiv211}>
                      Reputation{" "}
                      <Help
                        text={
                          "Stars on the basis of acceptance rate of projects"
                        }
                      />
                    </div>
                    <div className={styles.allStars}>
                      {[...Array(5)].map((_, index) => {
                        const rating = Number(aceData?.reputation);
                        const fullStars = Math.floor(rating);
                        const hasHalfStar = rating - fullStars >= 0.5;

                        return (
                          <span key={index}>
                            {index < fullStars ? (
                              <BsStarFill fill="gold" />
                            ) : index === fullStars && hasHalfStar ? (
                              <BsStarHalf fill="gold" />
                            ) : (
                              <BsStar fill="gold" />
                            )}
                          </span>
                        );
                      })}
                    </div>
                  </div>
                  <div className={styles.ratingDiv21}>
                    <div className={styles.ratingDiv211}>
                      Responsiveness
                      <Help
                        text={
                          "Stars on the basis of Average time taken for reply"
                        }
                      />
                    </div>
                    <div className={styles.allStars}>
                      {[...Array(5)].map((_, index) => {
                        const rating = Number(aceData?.responsiveness);
                        const fullStars = Math.floor(rating);
                        const hasHalfStar = rating - fullStars >= 0.5;

                        return (
                          <span key={index}>
                            {index < fullStars ? (
                              <BsStarFill fill="gold" />
                            ) : index === fullStars && hasHalfStar ? (
                              <BsStarHalf fill="gold" />
                            ) : (
                              <BsStar fill="gold" />
                            )}
                          </span>
                        );
                      })}
                    </div>
                  </div>
                </div>
                <div className={styles.ratingDiv2}>
                  <div className={styles.ratingDiv21}>
                    <div className={styles.ratingDiv221}>
                      Projects Done
                      <Help
                        text={"Stars on the basis of time taken for reply"}
                      />
                    </div>
                    <div className={styles.ratingDiv212}>
                      {aceData?.projectsDone}
                    </div>
                  </div>
                  <div className={styles.ratingDiv21}>
                    <div className={styles.ratingDiv221}>
                      Project Ongoing
                      <Help
                        text={"Stars on the basis of time taken for reply"}
                      />
                    </div>
                    <div className={styles.ratingDiv212}>
                      {aceData?.projectsOngoing}
                    </div>
                  </div>
                  <div className={styles.ratingDiv21}>
                    <div className={styles.ratingDiv221}>
                      Availability
                      <Help
                        text={"Stars on the basis of time taken for reply"}
                      />
                    </div>
                    <div className={styles.ratingDiv212}>
                      {aceData ? aceData?.availability : "Mon-Fri"}
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
          </Col>
          <Col
            className={`${styles.details} ${styles.borders} ${styles.awards}`}
          >
            No Awards
          </Col>
        </Row>
        <Row className={styles.allDetails}>
          <span
            className={styles.editIcon}
            onClick={() => setDetailModalShow(true)}
          >
            <FaEdit />
          </span>
          <Col lg={8} className={styles.overview}>
            {/* <div className={styles.detailDiv}>
              <div className={styles.detailHeading}>Categories</div>
              <div className={styles.detailData}>
                {aceData?.categories && aceData?.categories.length !== 0
                  ? aceData.categories.map((item, index) => {
                      if (aceData.categories.length === index + 1) {
                        return item + ".";
                      } else return item + ", ";
                    })
                  : "Category 1, Category 2, Category 3, Category 4"}
              </div>
            </div> */}
            <div className={styles.detailDiv}>
              <div className={styles.detailHeading}>Services</div>
              <div className={styles.detailData}>
                {aceData?.services && aceData?.services.length !== 0
                  ? aceData?.services?.map((item, index) => {
                      if (aceData.services.length === index + 1) {
                        return item + ".";
                      } else return item + ", ";
                    })
                  : "Service A, Service B, Service C, Service D"}
              </div>
            </div>
            <div className={styles.detailDiv}>
              <div className={styles.detailHeading}>Area's Served</div>
              <div className={styles.detailData}>
                {aceData?.serviceAreas && aceData?.serviceAreas.length !== 0
                  ? aceData?.serviceAreas.map((item, index) => {
                      if (aceData.serviceAreas.length === index + 1) {
                        return item + ".";
                      } else return item + ", ";
                    })
                  : "City 1, City 2, City 3, City 4, City 5"}
              </div>
            </div>
          </Col>
          <Col className="p-0">
            <div className={styles.detailDiv}>
              <div className={styles.detailHeading}>Year of Establised</div>
              <div className={styles.detailData}>
                {aceData?.yearOfEstablishment
                  ? aceData.yearOfEstablishment
                  : "Not Added Yet"}
              </div>
            </div>
            <div className={styles.detailDiv}>
              <div className={styles.detailHeading}>Payment method</div>
              <div className={styles.detailData}>
                {aceData && aceData.paymentMethod}
              </div>
            </div>
            <div className={styles.detailDiv}>
              <div className={styles.detailHeading}>Number of workers</div>
              <div className={styles.detailData}>
                {aceData && aceData.totalWorkers}
              </div>
            </div>
            <div className={styles.detailDiv}>
              <div className={styles.detailHeading}>Written Contract</div>
              <div className={styles.detailData}>
                {(aceData && aceData?.writtenContract === "true") ||
                aceData?.writtenContract === true
                  ? "Yes"
                  : "No"}
              </div>
            </div>
          </Col>
        </Row>
      </Container>
      {/* <SwitchToUser /> */}
      <ProfileModal
        show={profileModalShow}
        onhide={() => setProfileModalShow(false)}
        handlechanges={handlechanges}
        handleclose={handleClose}
        handleformchange={handleFormChange}
        handleimagechange={handleimagechange}
        data={dummyData}
      />
      <DiscriptionModal
        show={discriptionModalShow}
        onHide={() => setDiscriptionModalShow(false)}
        handlechanges={handlechanges}
        handleClose={handleClose}
        handleFormChange={handleFormChange}
        data={dummyData}
      />
      <ProjectsModal
        show={projectsModalShow}
        onHide={() => setProjectsModalShow(false)}
        handlechanges={handlechanges}
        handleClose={handleClose}
        handleFormChange={handleFormChange}
        data={dummyData}
      />
      <DetailModal
        show={detailModalShow}
        onHide={() => setDetailModalShow(false)}
        handlechanges={handlechanges}
        handleClose={handleClose}
        handleFormChange={handleFormChange}
        handleServicesChange={handleServicesChange}
        data={dummyData}
      />
    </div>
  );
};

function ProfileModal({
  show,
  onhide,
  handlechanges,
  handleclose,
  handleformchange,
  handleimagechange,
  data,
}) {
  const [validated, setValidated] = useState(false);
  const [formData, setFormData] = useState(data);
  const [credField, setCredField] = useState(false);

  return (
    <Modal
      show={show}
      onHide={onhide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Edit Profile
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form noValidate validated={validated}>
          <Row className="mb-3">
            <Form.Group as={Col} md="12" controlId="validationCustom02">
              <Form.Label>Company name</Form.Label>
              <Form.Control
                type="text"
                name="companyName"
                value={data?.companyName}
                onChange={handleformchange}
                required
                placeholder="Company Name"
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col} md="12" controlId="validationCustom02">
              <Form.Label>Change Profile</Form.Label>
              <Form.Control
                type="file"
                accept="image/*"
                onChange={handleimagechange}
              />

              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col} md="12" controlId="validationCustom03">
              <Form.Label>Location</Form.Label>
              <Form.Control
                type="text"
                name="location"
                value={data?.location}
                onChange={handleformchange}
                required
                placeholder="Location..."
              />
              <Form.Control.Feedback type="invalid">
                Please provide a valid Location.
              </Form.Control.Feedback>
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col} md="12" controlId="validationCustom03">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="text"
                name="companyEmail"
                value={data?.companyEmail}
                onChange={handleformchange}
                required
                // disabled={data?.companyEmail ? true : false}
                placeholder="Email/Gmail..."
              />
              <Form.Control.Feedback type="invalid">
                Please provide a valid email.
              </Form.Control.Feedback>
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col} md="12" controlId="validationCustom03">
              <Form.Label>Number</Form.Label>
              <Form.Control
                type="number"
                name="number"
                value={data?.companyNumber}
                onChange={handleformchange}
                required
                disabled
                placeholder="Number..."
              />
              <Form.Control.Feedback type="invalid">
                Please provide a valid number.
              </Form.Control.Feedback>
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group
              as={Col}
              md="12"
              className="position-relative"
              controlId="validationCustom03"
            >
              <Form.Label>Password</Form.Label>
              <Form.Control
                type={credField ? "text" : "password"}
                name="password"
                value={data?.companyPassword}
                onChange={handleformchange}
                required
                placeholder="Password..."
                disabled
              />
              <span
                className={styles.floatingEye}
                onClick={() => setCredField(!credField)}
              >
                {!credField ? <AiFillEyeInvisible /> : <AiFillEye />}
              </span>
              <Form.Control.Feedback type="invalid">
                Please provide a valid password.
              </Form.Control.Feedback>
            </Form.Group>
          </Row>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <CustomButton
          text={"Close"}
          onClick={() => handleclose()}
          width={"auto"}
        />
        <CustomButton
          text={"Save Changes"}
          onClick={() => handlechanges(formData)}
          width={"auto"}
        />
      </Modal.Footer>
    </Modal>
  );
}

function DiscriptionModal({
  show,
  onHide,
  handlechanges,
  handleClose,
  handleFormChange,
  data,
}) {
  const [validated, setValidated] = useState(false);
  const [formData, setFormData] = useState(data);

  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Edit Discription
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form noValidate validated={validated}>
          <Row className="mb-3">
            <Form.Group as={Col} md="12" controlId="validationCustom01">
              <Form.Label>Summary</Form.Label>
              <Form.Control
                required
                as="textarea"
                placeholder="Summary..."
                style={{ height: "100px" }}
                type="text"
                name="brief"
                value={data?.brief}
                onChange={handleFormChange}
              />

              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>
          </Row>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <CustomButton text={"Close"} onClick={onHide} width={"auto"} />
        <CustomButton
          text={"Save Changes"}
          onClick={() => handlechanges(formData)}
          width={"auto"}
        />
      </Modal.Footer>
    </Modal>
  );
}
function ProjectsModal({
  show,
  onHide,
  handlechanges,
  handleClose,
  handleFormChange,
  data,
}) {
  const [validated, setValidated] = useState(false);
  const [formData, setFormData] = useState(data);

  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Edit Projects Details
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form noValidate validated={validated}>
          <Row className="mb-3">
            <Form.Group as={Col} md="12" controlId="validationCustom02">
              <Form.Label>Availability</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Mon-Sat"
                defaultValue="Mon-Fri"
                name="availability"
                value={data?.availability}
                onChange={handleFormChange}
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>
          </Row>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <CustomButton text={"Close"} onClick={onHide} width={"auto"} />
        <CustomButton
          text={"Save Changes"}
          onClick={() => handlechanges(formData)}
          width={"auto"}
        />
      </Modal.Footer>
    </Modal>
  );
}
function DetailModal({
  show,
  onHide,
  handlechanges,
  handleClose,
  handleFormChange,
  handleServicesChange,
  data,
}) {
  const [validated, setValidated] = useState(false);
  const [formData, setFormData] = useState(data);
  const AllServices = allServices.map((service) => service.title);

  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      {" "}
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Edit Company Details
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form noValidate validated={validated}>
          <Row className="mb-3">
            <Form.Group as={Col} md="12" controlId="validationCustom01">
              <Form.Label>Services</Form.Label>
              <CheckboxDropdown
                options={AllServices}
                onChange={handleServicesChange}
                required
                placeholder="Add Services..."
                name="services"
                selected={data?.services && data.services}
              />

              {/* <Form.Control
                required
                type="text"
                placeholder="Add Services..."
                value={data?.services}
                name="services"
                onChange={handleFormChange}
              /> */}
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col} md="12" controlId="validationCustom01">
              <Form.Label>Services Provided in Areas</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Add category..."
                value={data?.serviceAreas}
                name="serviceAreas"
                onChange={handleFormChange}
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group
              as={Col}
              md="12"
              className="mb-3"
              controlId="validationCustom03"
            >
              <Form.Label>Year Established</Form.Label>
              <Form.Control
                type="text"
                placeholder="e.g.2000"
                required
                name="yearOfEstablishment"
                value={data?.yearOfEstablishment}
                onChange={handleFormChange}
              />
              <Form.Control.Feedback type="invalid">
                Please provide a valid Location.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group
              as={Col}
              className="mb-3"
              md="12"
              controlId="validationCustom03"
            >
              <Form.Label>Payment method</Form.Label>
              <Form.Control
                type="text"
                placeholder="e.g.cash/card/UPI"
                required
                name="paymentMethod"
                value={data?.paymentMethod}
                onChange={handleFormChange}
              />
              <Form.Control.Feedback type="invalid">
                Please provide a valid Location.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group
              as={Col}
              className="mb-3"
              md="12"
              controlId="validationCustom03"
            >
              <Form.Label>Number of workers</Form.Label>
              <Form.Control
                type="text"
                placeholder="e.g.20"
                required
                name="totalWorkers"
                value={data?.totalWorkers}
                onChange={handleFormChange}
              />
              <Form.Control.Feedback type="invalid">
                Please provide a valid Location.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="12" controlId="validationCustom03">
              <Form.Label>Written Contract</Form.Label>
              <Form.Select
                required
                name="writtenContract"
                value={data?.writtenContract}
                onChange={handleFormChange}
              >
                <option value="" disabled>
                  Select Option
                </option>
                <option value="true">Yes</option>
                <option value="false">No</option>
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                Please provide a valid option.
              </Form.Control.Feedback>
            </Form.Group>
          </Row>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <CustomButton text={"Close"} onClick={onHide} width={"auto"} />
        <CustomButton
          text={"Save Changes"}
          onClick={() => handlechanges(formData)}
          width={"auto"}
        />
      </Modal.Footer>
    </Modal>
  );
}

export default AceProfile;
