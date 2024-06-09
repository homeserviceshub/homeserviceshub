import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Modal,
  Form,
  InputGroup,
  Button,
} from "react-bootstrap";
import styles from "./index.module.css";
import { BsStar, BsStarFill, BsStarHalf } from "react-icons/bs";
import { FaEdit } from "react-icons/fa";
import Help from "../../../components/help";
import CustomButton from "../../../components/customBtn";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import SwitchToUser from "../../../components/switchToUser";

const AceProfile = () => {
  const [profileModalShow, setProfileModalShow] = useState(false);
  const [discriptionModalShow, setDiscriptionModalShow] = useState(false);
  const [socialModalShow, setSocialModalShow] = useState(false);
  const [detailModalShow, setDetailModalShow] = useState(false);
  const [projectsModalShow, setProjectsModalShow] = useState(false);
  const [aceData, setAceData] = useState();
  const navigate = useNavigate();
  const [discription] = useState(
    "Here is the breif information about out company. hello there we are home builder and we are professional in renovation.We are just a small group of 10 people and looking forward to work with you guys. there is no rush you can check our website rating from the most trusted website for home renovation and then decide wheather you want the best of an advice of an old friend.We are good in bathroom reno, kitched reno and basement renovation. Just fill up some details and we will reply you as soon as possible."
  );

  const [dummyData, setDummyData] = useState(aceData);
  useEffect(() => {
    const id = localStorage.getItem("aauth");
    if (id) {
      try {
        axios
          .post("http://localhost:8000/acedata", {
            id: id,
          })
          .then((response) => {
            if (response.status === 200) {
              if (response.data.message) {
                console.log(response.data.message);
              } else {
                setAceData(response.data.aceData);
                setDummyData(response.data.aceData);
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
  }, []);
  const [selectedImage, setSelectedImage] = useState(null);
  const handleFormChange = (event) => {
    const { name, value } = event.target;

    // Update state based on the input field name
    if (name === "categories") {
      setDummyData((prev) => ({
        ...prev,
        categories: value.split(",").map((category) => category.trimStart()),
      }));
    } else if (name === "services") {
      setDummyData((prev) => ({
        ...prev,
        services: value.split(",").map((service) => service.trimStart()),
      }));
    } else if (name === "serviceAreas") {
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

        const response = await axios.post(
          "http://localhost:8000/upload",
          formData
        );

        if (response.status === 200) {
          const mediaObject = {
            path: response.data.filePath.filename,
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
        .post("http://localhost:8000/updateaceuser", {
          data: {
            ...dummyData,
            profilePhoto: data,
          },
          id: localStorage.getItem("aauth"),
        })
        .then((response) => {
          if (response.status === 200) {
            console.log(response.data);
            alert("User data updated successfully");
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
                {aceData?.profilePhoto ? (
                  <img
                    src={`http://localhost:8000/images/${aceData.profilePhoto.path}`}
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
                <CustomButton text={"See Plans"} />
              </div>
              <div className={styles.profilebtn}>
                <CustomButton
                  text={"Edit Profile"}
                  onClick={() => setProfileModalShow(true)}
                />
              </div>
              <div className={styles.profilebtn}>
                <CustomButton
                  text={"Customer Dashboard"}
                  onClick={() => setProfileModalShow(true)}
                />
              </div>
            </Col>
          </Row>
        </Container>
      </div>

      <Container className={styles.containerY}>
        <Row id="overview">
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
            <div className={styles.detailDiv}>
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
            </div>
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
        onHide={() => setProfileModalShow(false)}
        handlechanges={handlechanges}
        handleClose={handleClose}
        handleFormChange={handleFormChange}
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
        data={dummyData}
      />
    </div>
  );
};

function ProfileModal(props) {
  const [validated, setValidated] = useState(false);
  const [formData, setFormData] = useState(props.data);

  return (
    <Modal
      {...props}
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
                value={props.data?.companyName}
                onChange={props.handleFormChange}
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
                onChange={props.handleimagechange}
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
                value={props.data?.location}
                onChange={props.handleFormChange}
                required
                placeholder="Location..."
              />
              <Form.Control.Feedback type="invalid">
                Please provide a valid Location.
              </Form.Control.Feedback>
            </Form.Group>
          </Row>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <CustomButton
          text={"Close"}
          onClick={() => props.handleClose()}
          width={"auto"}
        />
        <CustomButton
          text={"Save Changes"}
          onClick={() => props.handlechanges(formData)}
          width={"auto"}
        />
      </Modal.Footer>
    </Modal>
  );
}

function DiscriptionModal(props) {
  const [validated, setValidated] = useState(false);
  const [formData, setFormData] = useState(props.data);
  return (
    <Modal
      {...props}
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
                value={props.data?.brief}
                onChange={props.handleFormChange}
              />

              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>
          </Row>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <CustomButton text={"Close"} onClick={props.onHide} width={"auto"} />
        <CustomButton
          text={"Save Changes"}
          onClick={() => props.handlechanges(formData)}
          width={"auto"}
        />
      </Modal.Footer>
    </Modal>
  );
}
function ProjectsModal(props) {
  const [validated, setValidated] = useState(false);
  const [formData, setFormData] = useState(props.data);
  return (
    <Modal
      {...props}
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
                value={props.data?.availability}
                onChange={props.handleFormChange}
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>
          </Row>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <CustomButton text={"Close"} onClick={props.onHide} width={"auto"} />
        <CustomButton
          text={"Save Changes"}
          onClick={() => props.handlechanges(formData)}
          width={"auto"}
        />
      </Modal.Footer>
    </Modal>
  );
}
function DetailModal(props) {
  const [validated, setValidated] = useState(false);
  const [formData, setFormData] = useState(props.data);

  const handleAddItem = (newItem, item, setItem, newItemState) => {
    if (newItem.trim() !== "") {
      setItem([...item, newItem]);
      newItemState("");
    }
  };
  const onDeleteItem = (index, itemState, setItem) => {
    const newItems = [...itemState];
    newItems.splice(index, 1);
    setItem(newItems);
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
          Edit Company Details
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form noValidate validated={validated}>
          <Row className="mb-3">
            <Form.Group as={Col} md="12" controlId="validationCustom01">
              <Form.Label>Categories</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Add category..."
                value={props.data?.categories}
                name="categories"
                onChange={props.handleFormChange}
              />
              {console.log(props?.data?.categories)}
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col} md="12" controlId="validationCustom01">
              <Form.Label>Services</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Add Services..."
                value={props.data?.services}
                name="services"
                onChange={props.handleFormChange}
              />
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
                value={props.data?.serviceAreas}
                name="serviceAreas"
                onChange={props.handleFormChange}
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
                value={props.data?.yearOfEstablishment}
                onChange={props.handleFormChange}
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
                value={props.data?.paymentMethod}
                onChange={props.handleFormChange}
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
                value={props.data?.totalWorkers}
                onChange={props.handleFormChange}
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
                value={props.data?.writtenContract}
                onChange={props.handleFormChange}
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
        <CustomButton text={"Close"} onClick={props.onHide} width={"auto"} />
        <CustomButton
          text={"Save Changes"}
          onClick={() => props.handlechanges(formData)}
          width={"auto"}
        />
      </Modal.Footer>
    </Modal>
  );
}

export default AceProfile;
